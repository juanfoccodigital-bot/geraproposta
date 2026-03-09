import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t" style={{ background: "#0A0A0A", borderColor: "#1A1A1A" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="text-xs mt-3" style={{ color: "#737373" }}>
              A maior plataforma de propostas comerciais profissionais do Brasil.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Produto</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Templates</Link></li>
              <li><Link href="/pricing" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Precos</Link></li>
            </ul>
          </div>

          {/* Nichos */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Nichos</h4>
            <ul className="space-y-2">
              <li><Link href="/nicho/social-media" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Social Media</Link></li>
              <li><Link href="/nicho/gestor-de-trafego" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Gestor de Trafego</Link></li>
              <li><Link href="/nicho/freelancer" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Freelancer</Link></li>
              <li><Link href="/nicho/clinica" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Clinica / Saude</Link></li>
              <li><Link href="/nicho/agencia" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Agencia Digital</Link></li>
            </ul>
          </div>

          {/* Conta */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Conta</h4>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Entrar</Link></li>
              <li><Link href="/signup" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Cadastre-se</Link></li>
              <li><Link href="/pricing" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Assinar Premium</Link></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Suporte</h4>
            <ul className="space-y-2">
              <li><Link href="/suporte" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Central de Ajuda</Link></li>
              <li><a href="https://wa.me/5541997038671" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>WhatsApp</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><span className="text-xs" style={{ color: "#737373" }}>Termos de Uso</span></li>
              <li><Link href="/privacidade" className="text-xs transition-colors hover:text-white" style={{ color: "#737373" }}>Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t" style={{ borderColor: "#1A1A1A" }}>
          <p className="text-[10px] text-center" style={{ color: "#737373" }}>
            &copy; {new Date().getFullYear()} gerapropostas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
