"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Check, Copy, Loader2, X, QrCode, CreditCard, AlertCircle, RefreshCw } from "lucide-react";
import { loadStripe, PaymentRequest } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

/* ============================================
   CHECKOUT MODAL
   PIX: QR Code nativo via AbacatePay
   Cartao: Stripe Elements (transparente)
   ============================================ */

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutModalProps {
    plan: string;
    planLabel: string;
    amount: number;           // em centavos
    billingId: string;
    brCode: string;           // copia-e-cola
    qrCodeImage: string;      // base64 ou url
    onClose: () => void;
    onSuccess: () => void;
}

function formatCents(cents: number) {
    return (cents / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function useCountdown(seconds: number) {
    const [remaining, setRemaining] = useState(seconds);
    useEffect(() => {
        if (remaining <= 0) return;
        const t = setInterval(() => setRemaining((r) => r - 1), 1000);
        return () => clearInterval(t);
    }, [remaining]);
    const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
    const ss = String(remaining % 60).padStart(2, "0");
    return { remaining, label: `${mm}:${ss}` };
}

/* ---- Stripe Card Form (formulario transparente + Apple/Google Pay) ---- */
function CardForm({
    plan,
    amount,
    planLabel,
    onSuccess,
    onClose,
}: {
    plan: string;
    amount: number;
    planLabel: string;
    onSuccess: () => void;
    onClose: () => void;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Apple Pay / Google Pay via PaymentRequest API
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
    const [walletAvailable, setWalletAvailable] = useState(false);

    useEffect(() => {
        if (!stripe) return;

        const pr = stripe.paymentRequest({
            country: "BR",
            currency: "brl",
            total: {
                label: planLabel,
                amount, // em centavos
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        pr.canMakePayment().then((result) => {
            if (result) {
                setPaymentRequest(pr);
                setWalletAvailable(true);
            }
        });

        // Quando o usuario confirma no Apple/Google Pay
        pr.on("paymentmethod", async (ev) => {
            setLoading(true);
            setError("");

            try {
                // 1. Criar subscription no backend
                const res = await fetch("/api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ plan }),
                });
                const data = await res.json();

                if (!data.clientSecret) {
                    ev.complete("fail");
                    setError(data.error || "Erro ao processar pagamento.");
                    setLoading(false);
                    return;
                }

                // 2. Confirmar com o payment method da wallet
                const { error: confirmError, paymentIntent } =
                    await stripe.confirmCardPayment(
                        data.clientSecret,
                        { payment_method: ev.paymentMethod.id },
                        { handleActions: false },
                    );

                if (confirmError) {
                    ev.complete("fail");
                    setError(confirmError.message || "Erro no pagamento.");
                    setLoading(false);
                    return;
                }

                ev.complete("success");

                // Pode precisar de 3DS
                if (paymentIntent?.status === "requires_action") {
                    const { error: actionError } = await stripe.confirmCardPayment(data.clientSecret);
                    if (actionError) {
                        setError(actionError.message || "Erro na autenticacao.");
                        setLoading(false);
                        return;
                    }
                }

                setSuccess(true);
                setTimeout(onSuccess, 1500);
            } catch {
                ev.complete("fail");
                setError("Erro de conexao. Tente novamente.");
            } finally {
                setLoading(false);
            }
        });
    }, [stripe, plan, amount, planLabel, onSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError("");

        try {
            // 1. Criar subscription no backend (retorna clientSecret)
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            });
            const data = await res.json();

            if (!data.clientSecret) {
                setError(data.error || "Erro ao processar pagamento.");
                setLoading(false);
                return;
            }

            // 2. Confirmar pagamento com o cartao via Stripe Elements
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                setError("Erro no formulario do cartao.");
                setLoading(false);
                return;
            }

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: { card: cardElement },
                },
            );

            if (stripeError) {
                setError(stripeError.message || "Erro no pagamento.");
                setLoading(false);
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                setSuccess(true);
                setTimeout(onSuccess, 1500);
            }
        } catch {
            setError("Erro de conexao. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center gap-3 py-8">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "#16A34A20" }}
                >
                    <Check className="w-8 h-8" style={{ color: "#22C55E" }} />
                </div>
                <p className="text-white font-semibold text-lg">Pagamento confirmado!</p>
                <p className="text-sm" style={{ color: "#737373" }}>Redirecionando para o dashboard…</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
            {/* Apple Pay / Google Pay button */}
            {walletAvailable && paymentRequest && (
                <>
                    <PaymentRequestButtonElement
                        options={{
                            paymentRequest,
                            style: {
                                paymentRequestButton: {
                                    type: "default",
                                    theme: "light",
                                    height: "48px",
                                },
                            },
                        }}
                    />
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px" style={{ background: "#262626" }} />
                        <span className="text-xs" style={{ color: "#525252" }}>ou pague com cartao</span>
                        <div className="flex-1 h-px" style={{ background: "#262626" }} />
                    </div>
                </>
            )}

            <p className="text-sm" style={{ color: "#A3A3A3" }}>
                Insira os dados do seu cartao de credito
            </p>

            <div
                className="rounded-xl p-4"
                style={{ background: "#0A0A0A", border: "1px solid #1F1F1F" }}
            >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#FFFFFF",
                                "::placeholder": { color: "#525252" },
                                iconColor: "#F97316",
                            },
                            invalid: { color: "#EF4444" },
                        },
                        hidePostalCode: true,
                    }}
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 text-sm" style={{ color: "#EF4444" }}>
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "#F97316" }}
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <><CreditCard className="w-4 h-4" /> Pagar com Cartao</>
                )}
            </button>

            <button
                type="button"
                onClick={onClose}
                className="text-xs text-center transition-colors hover:text-white"
                style={{ color: "#525252" }}
            >
                Cancelar
            </button>
        </form>
    );
}

/* ---- Modal Principal ---- */
export default function CheckoutModal({
    plan,
    planLabel,
    amount,
    billingId,
    brCode,
    qrCodeImage,
    onClose,
    onSuccess,
}: CheckoutModalProps) {
    const [tab, setTab] = useState<"pix" | "card">("pix");
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState<"pending" | "paid" | "expired">("pending");
    const [pollError, setPollError] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { remaining, label: timeLabel } = useCountdown(3600);

    /* Polling de status PIX a cada 3s (so na aba PIX) */
    const poll = useCallback(async () => {
        if (!billingId) return;
        try {
            const res = await fetch(`/api/checkout/pix/status?billingId=${billingId}`);
            if (!res.ok) { setPollError(true); return; }
            const data = await res.json();
            setPollError(false);
            if (data.status === "PAID") {
                setStatus("paid");
                if (intervalRef.current) clearInterval(intervalRef.current);
                setTimeout(onSuccess, 1500);
            } else if (data.status === "EXPIRED") {
                setStatus("expired");
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        } catch {
            setPollError(true);
        }
    }, [billingId, onSuccess]);

    useEffect(() => {
        if (tab === "pix" && billingId) {
            intervalRef.current = setInterval(poll, 3000);
            return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
        }
    }, [poll, tab, billingId]);

    /* Expirado por timer local */
    useEffect(() => {
        if (remaining <= 0 && tab === "pix") setStatus("expired");
    }, [remaining, tab]);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(brCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            /* fallback */
        }
    };

    /* Renderizar imagem QR */
    const qrSrc = qrCodeImage.startsWith("data:")
        ? qrCodeImage
        : qrCodeImage
            ? `data:image/png;base64,${qrCodeImage}`
            : null;

    return (
        /* Overlay */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Card */}
            <div
                className="relative w-full max-w-md rounded-2xl overflow-hidden"
                style={{
                    background: "#111111",
                    border: "1px solid #1F1F1F",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-5"
                    style={{ borderBottom: "1px solid #1F1F1F" }}
                >
                    <div>
                        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#F97316" }}>
                            Finalizar assinatura
                        </p>
                        <h2 className="text-lg font-bold text-white mt-0.5">{planLabel}</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-extrabold text-white">{formatCents(amount)}</span>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: "#1A1A1A" }}
                        >
                            <X className="w-4 h-4" style={{ color: "#737373" }} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex" style={{ borderBottom: "1px solid #1F1F1F" }}>
                    {(["pix", "card"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors"
                            style={{
                                color: tab === t ? "#F97316" : "#737373",
                                borderBottom: tab === t ? "2px solid #F97316" : "2px solid transparent",
                                background: "transparent",
                            }}
                        >
                            {t === "pix" ? <QrCode className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                            {t === "pix" ? "PIX" : "Cartao"}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* ---- TAB PIX (AbacatePay) ---- */}
                    {tab === "pix" && (
                        <>
                            {status === "paid" && (
                                <div className="flex flex-col items-center gap-3 py-8">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center"
                                        style={{ background: "#16A34A20" }}
                                    >
                                        <Check className="w-8 h-8" style={{ color: "#22C55E" }} />
                                    </div>
                                    <p className="text-white font-semibold text-lg">Pagamento confirmado!</p>
                                    <p className="text-sm" style={{ color: "#737373" }}>Redirecionando para o dashboard…</p>
                                </div>
                            )}

                            {status === "expired" && (
                                <div className="flex flex-col items-center gap-3 py-8">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center"
                                        style={{ background: "#EF444420" }}
                                    >
                                        <AlertCircle className="w-8 h-8" style={{ color: "#EF4444" }} />
                                    </div>
                                    <p className="text-white font-semibold">QR Code expirado</p>
                                    <p className="text-sm text-center" style={{ color: "#737373" }}>
                                        Feche e clique em &quot;Assinar&quot; novamente para gerar um novo QR Code.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-80"
                                        style={{ background: "#F97316" }}
                                    >
                                        Gerar novo QR Code
                                    </button>
                                </div>
                            )}

                            {status === "pending" && (
                                <>
                                    {/* Timer */}
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-sm" style={{ color: "#A3A3A3" }}>
                                            Escaneie o QR Code com seu app bancario
                                        </p>
                                        <span
                                            className="text-xs font-mono px-2 py-1 rounded-md"
                                            style={{
                                                background: "#1A1A1A",
                                                color: remaining < 300 ? "#EF4444" : "#737373",
                                            }}
                                        >
                                            {timeLabel}
                                        </span>
                                    </div>

                                    {/* QR Code */}
                                    <div
                                        className="relative mx-auto mb-4 rounded-xl overflow-hidden flex items-center justify-center"
                                        style={{
                                            width: 220,
                                            height: 220,
                                            background: "#FFFFFF",
                                            padding: 10,
                                        }}
                                    >
                                        {qrSrc ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={qrSrc}
                                                alt="QR Code PIX"
                                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                            />
                                        ) : (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(brCode)}`}
                                                alt="QR Code PIX"
                                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                            />
                                        )}
                                        {/* Polling indicator */}
                                        <div className="absolute bottom-2 right-2">
                                            <RefreshCw
                                                className="w-3 h-3 animate-spin"
                                                style={{ color: "#A3A3A3" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Copy code */}
                                    <div
                                        className="rounded-xl p-4 mb-4"
                                        style={{ background: "#0A0A0A", border: "1px solid #1F1F1F" }}
                                    >
                                        <p className="text-xs mb-2 font-medium" style={{ color: "#737373" }}>
                                            Ou copie o codigo PIX Copia e Cola
                                        </p>
                                        <div
                                            className="flex items-center gap-2 text-xs font-mono break-all"
                                            style={{ color: "#A3A3A3" }}
                                        >
                                            <span className="flex-1 line-clamp-2">{brCode || "Carregando..."}</span>
                                        </div>
                                        <button
                                            onClick={copyCode}
                                            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
                                            style={{
                                                background: copied ? "#16A34A20" : "#F9731615",
                                                border: `1px solid ${copied ? "#22C55E40" : "#F9731630"}`,
                                                color: copied ? "#22C55E" : "#F97316",
                                            }}
                                        >
                                            {copied ? (
                                                <><Check className="w-4 h-4" /> Copiado!</>
                                            ) : (
                                                <><Copy className="w-4 h-4" /> Copiar codigo</>
                                            )}
                                        </button>
                                    </div>

                                    {/* Aguardando */}
                                    <div className="flex items-center justify-center gap-2">
                                        {pollError ? (
                                            <AlertCircle className="w-4 h-4" style={{ color: "#EF4444" }} />
                                        ) : (
                                            <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#737373" }} />
                                        )}
                                        <p className="text-xs" style={{ color: "#737373" }}>
                                            {pollError
                                                ? "Verificando status… aguarde."
                                                : "Aguardando confirmacao do pagamento…"}
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* ---- TAB CARTAO (Stripe Elements) ---- */}
                    {tab === "card" && (
                        <Elements
                            stripe={stripePromise}
                            options={{
                                appearance: {
                                    theme: "night",
                                    variables: {
                                        colorPrimary: "#F97316",
                                        colorBackground: "#0A0A0A",
                                        colorText: "#FFFFFF",
                                        colorDanger: "#EF4444",
                                        borderRadius: "12px",
                                    },
                                },
                            }}
                        >
                            <CardForm plan={plan} amount={amount} planLabel={planLabel} onSuccess={onSuccess} onClose={onClose} />
                        </Elements>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="px-6 pb-5 text-center"
                    style={{ borderTop: "1px solid #1A1A1A", paddingTop: 16 }}
                >
                    <p className="text-xs" style={{ color: "#525252" }}>
                        {tab === "pix"
                            ? "Pagamento PIX processado por AbacatePay"
                            : "Pagamento seguro processado por Stripe"}
                    </p>
                </div>
            </div>
        </div>
    );
}
