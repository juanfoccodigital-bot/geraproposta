"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Check, Copy, Loader2, X, QrCode, CreditCard, AlertCircle, RefreshCw } from "lucide-react";

/* ============================================
   CHECKOUT MODAL — PIX nativo
   Exibe QR Code PIX gerado pela propria API.
   Faz polling a cada 3s para confirmar pag.
   Cartao: link discreto para pagina hosted.
   ============================================ */

interface CheckoutModalProps {
    plan: string;
    planLabel: string;
    amount: number;           // em centavos
    billingId: string;
    brCode: string;           // copia-e-cola
    qrCodeImage: string;      // base64 ou url
    cardUrl?: string;         // fallback hosted (cartao)
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

export default function CheckoutModal({
    plan,
    planLabel,
    amount,
    billingId,
    brCode,
    qrCodeImage,
    cardUrl,
    onClose,
    onSuccess,
}: CheckoutModalProps) {
    const [tab, setTab] = useState<"pix" | "card">("pix");
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState<"pending" | "paid" | "expired">("pending");
    const [pollError, setPollError] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [cardError, setCardError] = useState("");
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { remaining, label: timeLabel } = useCountdown(3600);

    /* Polling de status a cada 3s */
    const poll = useCallback(async () => {
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
        intervalRef.current = setInterval(poll, 3000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [poll]);

    /* Expirado por timer local */
    useEffect(() => {
        if (remaining <= 0) setStatus("expired");
    }, [remaining]);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(brCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            /* fallback */
        }
    };

    /* Busca URL de cartão no /api/checkout e redireciona */
    const handleCardRedirect = async () => {
        if (cardUrl) {
            window.open(cardUrl, "_blank");
            return;
        }
        setCardLoading(true);
        setCardError("");
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            });
            const data = await res.json();
            if (data.url) {
                window.open(data.url, "_blank");
            } else {
                setCardError(data.error || "Erro ao gerar link de pagamento.");
            }
        } catch {
            setCardError("Erro de conexão. Tente novamente.");
        } finally {
            setCardLoading(false);
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
                            {t === "pix" ? "PIX" : "Cartão"}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* ---- TAB PIX ---- */}
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
                                        Feche e clique em "Assinar" novamente para gerar um novo QR Code.
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
                                            Escaneie o QR Code com seu app bancário
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
                                            /* Fallback: mostra brCode como QR via API pública */
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
                                            Ou copie o código PIX Copia e Cola
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
                                                <><Copy className="w-4 h-4" /> Copiar código</>
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
                                                : "Aguardando confirmação do pagamento…"}
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* ---- TAB CARTÃO ---- */}
                    {tab === "card" && (
                        <div className="flex flex-col items-center gap-5 py-8 text-center">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                                style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
                            >
                                <CreditCard className="w-8 h-8" style={{ color: "#525252" }} />
                                <span
                                    className="absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                    style={{ background: "#F97316", color: "#fff" }}
                                >
                                    EM BREVE
                                </span>
                            </div>

                            <div>
                                <p className="text-white font-semibold mb-1">Cartão de Crédito</p>
                                <p className="text-sm" style={{ color: "#737373" }}>
                                    Estamos integrando o Stripe para pagamentos com cartão direto aqui, sem sair da plataforma.
                                </p>
                            </div>

                            <button
                                disabled
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                                style={{
                                    background: "#1A1A1A",
                                    color: "#525252",
                                    border: "1px solid #2A2A2A",
                                    cursor: "not-allowed",
                                }}
                            >
                                <CreditCard className="w-4 h-4" /> Em breve via Stripe
                            </button>

                            <div
                                className="w-full rounded-xl p-3 flex items-start gap-2 text-left"
                                style={{ background: "#0A0A0A", border: "1px solid #1F1F1F" }}
                            >
                                <QrCode className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#F97316" }} />
                                <p className="text-xs" style={{ color: "#737373" }}>
                                    <span className="text-white font-medium">Use o PIX agora:</span> é aprovado na hora, sem taxas adicionais e disponível em qualquer banco.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="px-6 pb-5 text-center"
                    style={{ borderTop: "1px solid #1A1A1A", paddingTop: 16 }}
                >
                    <p className="text-xs" style={{ color: "#525252" }}>
                        🔒 Pagamento 100% seguro • Processado por AbacatePay
                    </p>
                </div>
            </div>
        </div>
    );
}
