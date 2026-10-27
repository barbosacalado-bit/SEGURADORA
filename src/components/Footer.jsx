import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, Headphones, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenTelefones }) {
  return (
    <footer className="bg-[#062653] text-white pt-16 sm:pt-20 border-t border-blue-900/40 relative overflow-hidden">
      {/* Elementos gráficos de fundo discretos */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0866C9]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* 4 Colunas Principais Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10 text-left">
          
          {/* Coluna 1: Logomarca e Resumo Institucional */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" />
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              A <strong>Messa Corretora de Seguros</strong> atua com dedicação e transparência em Bebedouro/SP e região, oferecendo proteção personalizada com as maiores e mais respeitadas seguradoras do Brasil.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#08A9E6]">
                <ShieldCheck className="w-4 h-4" />
                Corretagem autorizada e regularizada
              </span>
            </div>
          </div>

          {/* Coluna 2: Nossos Seguros e Serviços Reais */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#08A9E6] pl-2.5">
              Nossos Seguros
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <a href="#servicos" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Seguro de Veículos (Auto & Táxi)
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Seguro Residencial & Veraneio
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Seguro de Vida & Família
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Consórcio de Imóvel Porto Seguro
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Agronegócios & Equipamentos
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Previdência & Acidentes Pessoais
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Links Institucionais */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#08A9E6] pl-2.5">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <a href="#inicio" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Início
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Diferenciais
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Quem Somos
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTelefones}
                  className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5 text-left text-[#08A9E6] font-semibold"
                >
                  <Headphones className="w-3.5 h-3.5" /> Telefones Úteis 24h
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Dúvidas Frequentes
                </a>
              </li>
              <li>
                <a href="#noticias" className="hover:text-[#08A9E6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#08A9E6]">&rsaquo;</span> Notícias e Dicas
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Atendimento & Horários */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#08A9E6] pl-2.5">
              Atendimento Local
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p>
                Visite nosso escritório ou receba consultoria remota de forma ágil e segura.
              </p>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="text-white font-semibold">Horário Comercial:</p>
                <p className="text-xs text-slate-300">Segunda a Sexta: 08h00 às 18h00</p>
                <p className="text-xs text-[#08A9E6] font-medium pt-1">Sinistro e Socorro: 24 Horas</p>
              </div>
              <a
                href="#cotacao"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0866C9] hover:bg-[#08A9E6] text-white text-xs font-semibold rounded-xl transition-all shadow-md"
              >
                <span>Solicitar Proposta Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Faixa Inferior de Contatos com Ícones em Quadrados Azuis (Estilo Insuren) */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* E-mail */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-[#0866C9] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[11px] text-[#08A9E6] uppercase font-bold tracking-wider">E-mail Comercial</p>
              <a
                href="mailto:MESSACORRETORA@TERRA.COM.BR"
                className="text-xs sm:text-sm font-semibold text-white hover:text-[#08A9E6] transition-colors break-all"
              >
                MESSACORRETORA@TERRA.COM.BR
              </a>
            </div>
          </div>

          {/* Telefone */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-[#0866C9] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[11px] text-[#08A9E6] uppercase font-bold tracking-wider">Telefone Comercial</p>
              <a
                href="tel:01733429191"
                className="text-xs sm:text-sm font-bold text-white hover:text-[#08A9E6] transition-colors"
              >
                +55 (17) 3342-9191
              </a>
            </div>
          </div>

          {/* Endereço */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-[#0866C9] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[11px] text-[#08A9E6] uppercase font-bold tracking-wider">Endereço Físico</p>
              <p className="text-xs sm:text-sm font-medium text-white leading-tight">
                Av. Raul Furquim, 246 — Bebedouro / SP
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Faixa Inferior de Copyright */}
      <div className="bg-[#031633] py-5 border-t border-white/5 text-center text-xs text-slate-400">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} <strong>MESSA CORRETORA DE SEGUROS</strong>. Todos os direitos reservados. Bebedouro - SP.
          </p>
          <p className="text-[11px] text-slate-500">
            Av. Raul Furquim, 246 - Centro, Bebedouro - SP, 14700-300
          </p>
        </div>
      </div>
    </footer>
  );
}
