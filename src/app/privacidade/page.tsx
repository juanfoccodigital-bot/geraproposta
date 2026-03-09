import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

/* ============================================
   POLITICA DE PRIVACIDADE
   Conformidade com LGPD (Lei 13.709/2018).
   ============================================ */

export const metadata = {
  title: "Politica de Privacidade | GeraProposta",
  description: "Saiba como coletamos, usamos e protegemos seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <Navbar />
      <div className="h-16" />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Politica de Privacidade</h1>
        <p className="text-sm mb-10" style={{ color: "#737373" }}>
          Ultima atualizacao: 09 de marco de 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: "#A3A3A3" }}>
          <Section title="1. Introducao">
            A GeraProposta (&quot;nos&quot;, &quot;nosso&quot;) respeita sua privacidade e esta
            comprometida em proteger seus dados pessoais. Esta politica descreve como coletamos,
            usamos, armazenamos e protegemos suas informacoes, em conformidade com a Lei Geral de
            Protecao de Dados (LGPD — Lei 13.709/2018).
          </Section>

          <Section title="2. Dados que coletamos">
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li><strong className="text-white">Dados de cadastro:</strong> nome, email e senha (criptografada).</li>
              <li><strong className="text-white">Dados de uso:</strong> propostas criadas, biolinks, templates utilizados e logs de acesso.</li>
              <li><strong className="text-white">Dados de pagamento:</strong> processados pela Hubla. Nao armazenamos dados de cartao ou PIX em nossos servidores.</li>
              <li><strong className="text-white">Dados tecnicos:</strong> endereco IP, tipo de navegador, sistema operacional e cookies essenciais.</li>
            </ul>
          </Section>

          <Section title="3. Como usamos seus dados">
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li>Fornecer e manter nossos servicos (criacao de propostas, biolinks, sites).</li>
              <li>Gerenciar sua conta e assinatura.</li>
              <li>Melhorar a experiencia do usuario e desenvolver novos recursos.</li>
              <li>Enviar comunicacoes essenciais sobre sua conta (ex: confirmacao de pagamento, expiracoes).</li>
              <li>Cumprir obrigacoes legais.</li>
            </ul>
          </Section>

          <Section title="4. Compartilhamento de dados">
            Nao vendemos seus dados. Compartilhamos informacoes apenas com:
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li><strong className="text-white">Hubla:</strong> processamento de pagamentos.</li>
              <li><strong className="text-white">Supabase:</strong> armazenamento seguro de dados e autenticacao.</li>
              <li><strong className="text-white">Vercel:</strong> hospedagem da aplicacao.</li>
            </ul>
            Todos os parceiros seguem padroes adequados de seguranca e privacidade.
          </Section>

          <Section title="5. Armazenamento e seguranca">
            Seus dados sao armazenados em servidores seguros com criptografia em transito (HTTPS/TLS)
            e em repouso. Utilizamos autenticacao robusta, controle de acesso baseado em roles (RLS)
            e monitoramento continuo para proteger suas informacoes.
          </Section>

          <Section title="6. Seus direitos (LGPD)">
            Voce tem direito a:
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li>Acessar seus dados pessoais.</li>
              <li>Corrigir dados incompletos ou desatualizados.</li>
              <li>Solicitar a exclusao dos seus dados.</li>
              <li>Revogar consentimento a qualquer momento.</li>
              <li>Solicitar portabilidade dos seus dados.</li>
              <li>Obter informacoes sobre com quem seus dados foram compartilhados.</li>
            </ul>
            <p className="mt-2">
              Para exercer qualquer direito, entre em contato pelo email{" "}
              <a href="mailto:contato@geraproposta.com" className="text-[#F97316] hover:underline">
                contato@geraproposta.com
              </a>.
            </p>
          </Section>

          <Section title="7. Cookies">
            Utilizamos apenas cookies essenciais para manter sua sessao ativa e garantir o
            funcionamento da plataforma. Nao utilizamos cookies de rastreamento ou publicidade.
          </Section>

          <Section title="8. Retencao de dados">
            Seus dados sao mantidos enquanto sua conta estiver ativa. Apos exclusao da conta,
            seus dados pessoais serao removidos em ate 30 dias, exceto quando a retencao for
            necessaria para cumprir obrigacoes legais.
          </Section>

          <Section title="9. Comunicacoes de marketing">
            Voce pode optar por nao receber comunicacoes de marketing a qualquer momento
            atraves das configuracoes da sua conta ou clicando em &quot;descadastrar&quot; nos emails recebidos.
            Comunicacoes essenciais sobre sua conta e assinatura continuarao sendo enviadas.
          </Section>

          <Section title="10. Alteracoes nesta politica">
            Podemos atualizar esta politica periodicamente. Alteracoes significativas serao
            comunicadas por email ou notificacao na plataforma. O uso continuado do servico
            apos as alteracoes constitui aceite da politica atualizada.
          </Section>

          <Section title="11. Contato">
            Para duvidas sobre esta politica ou sobre seus dados pessoais:
            <ul className="list-none space-y-1 mt-2">
              <li>Email:{" "}
                <a href="mailto:contato@geraproposta.com" className="text-[#F97316] hover:underline">
                  contato@geraproposta.com
                </a>
              </li>
              <li>Suporte:{" "}
                <a href="/suporte" className="text-[#F97316] hover:underline">
                  geraproposta.com/suporte
                </a>
              </li>
            </ul>
          </Section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
