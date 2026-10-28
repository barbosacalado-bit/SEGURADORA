import React from 'react';
import { ShieldCheck, Phone } from 'lucide-react';

export default function PilaresEquipe() {
  const pilaresAtendimento = [
    {
      titulo: "Seguros de Automóveis & Frotas",
      atuacao: "Consultoria em Veículos",
      desc: "Análise de perfil, proteção contra colisão e roubo, e orientação em guincho e carro reserva.",
      foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
    },
    {
      titulo: "Seguros Patrimoniais & Lares",
      atuacao: "Consultoria Residencial",
      desc: "Proteção contra incêndio, vendaval, danos elétricos e assistência emergencial 24h para sua casa.",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    },
    {
      titulo: "Seguros de Vida & Família",
      atuacao: "Consultoria Pessoal",
      desc: "Planejamento sucessório, amparo aos dependentes e coberturas específicas em vida e acidentes.",
      foto: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600&auto=format&fit=crop"
    },
    {
      titulo: "Consórcios de Imóveis & Auto",
      atuacao: "Planejamento de Consórcio",
      desc: "Estratégia sem juros da Porto Seguro com assessoria completa em lances e uso do FGTS.",
      foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0866C9]/10 text-[#0866C9] text-xs font-bold uppercase tracking-wider">
            Consultoria Especializada
          </span>
          {/* ITEM 8: Quebra de linha exata com "para cada necessidade" na 2ª linha */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062653] tracking-tight leading-tight">
            Atendimento dedicado <br className="hidden sm:inline" />
            para cada necessidade
          </h2>
          <p className="text-sm sm:text-base text-[#596273]">
            Nossos consultores na Messa Corretora orientam você com profundidade técnica em cada área de seguros.
          </p>
        </div>

        {/* Grade de 4 Cards (Estilo Insuren) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pilaresAtendimento.map((item, idx) => (
            <div
              key={idx}
              className="group bg-[#F3F6FD] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between border border-slate-100"
            >
              {/* Fotografia Profissional */}
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <img
                  src={item.foto}
                  alt={item.titulo}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062653]/60 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#0866C9] uppercase">
                  Messa Corretora
                </div>
              </div>

              {/* Informações Institucionais do Pilar */}
              <div className="p-6 text-center space-y-2">
                <span className="text-xs font-semibold text-[#0866C9] uppercase tracking-wider block">
                  {item.atuacao}
                </span>
                <h3 className="text-base font-bold text-[#062653] leading-snug group-hover:text-[#0866C9] transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-xs text-[#596273] leading-relaxed pt-1">
                  {item.desc}
                </p>

                <div className="pt-3">
                  <a
                    href="#cotacao"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0866C9] hover:text-[#062653] group-hover:underline"
                  >
                    <span>Solicitar Atendimento</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
