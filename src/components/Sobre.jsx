import React from 'react';
import { Shield, CheckSquare, Award, Clock, ArrowRight, HeartHandshake, FileCheck } from 'lucide-react';

export default function Sobre() {
  const pilares = [
    {
      icon: Shield,
      titulo: "Assessoria Especializada",
      desc: "Análise minuciosa de coberturas, franquias e cláusulas da sua apólice."
    },
    {
      icon: Award,
      titulo: "As Melhores Seguradoras",
      desc: "Parcerias consolidadas com Porto Seguro, Azul, Tokio Marine e outras."
    },
    {
      icon: FileCheck,
      titulo: "Cotações Transparentes",
      desc: "Comparações claras sem pegadinhas ou cobranças ocultas."
    },
    {
      icon: HeartHandshake,
      titulo: "Suporte Total no Sinistro",
      desc: "Assistência humana de prontidão do aviso à liberação da indenização."
    }
  ];

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          
          {/* Coluna Esquerda: Composição Fotográfica Dupla Sobreposta com Selo Circular */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[500px] lg:max-w-none">
              
              {/* Fotografia Principal (Atendimento Consultivo) */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl w-[86%] sm:w-[82%] border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1000&auto=format&fit=crop"
                  alt="Atendimento consultivo na Messa Corretora"
                  className="w-full h-[360px] sm:h-[440px] object-cover object-center"
                />
              </div>

              {/* Fotografia Secundária Parcialmente Sobreposta (Conquista e Patrimônio Seguro) */}
              <div className="absolute -bottom-8 -right-2 sm:-right-4 w-[60%] sm:w-[58%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
                  alt="Patrimônio seguro com a Messa Corretora"
                  className="w-full h-[220px] sm:h-[260px] object-cover object-center"
                />
              </div>

              {/* Selo Circular Azul Decorativo Institucional (Estilo Insuren) */}
              <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#062653] to-[#0866C9] text-white p-3 shadow-xl border-4 border-white flex flex-col items-center justify-center text-center z-20">
                <Shield className="w-6 h-6 text-[#08A9E6] mb-1" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-tight">
                  Tradição & Confiança
                </span>
                <span className="text-[8.5px] text-blue-200 mt-0.5">Bebedouro / SP</span>
              </div>

              {/* Pontilhado decorativo de fundo */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-radial from-[#0866C9]/20 to-transparent opacity-70 -z-10"></div>
            </div>
          </div>

          {/* Coluna Direita: Conteúdo Institucional */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Etiqueta */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0866C9]/10 text-[#0866C9] text-xs font-bold uppercase tracking-wider">
              Conheça a Messa Corretora
            </div>

            {/* Título de Grande Impacto */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#062653] leading-tight tracking-tight">
              Compromisso genuíno com a sua segurança e a proteção do seu patrimônio
            </h2>

            {/* Texto de Apresentação Real */}
            <p className="text-base text-[#596273] leading-relaxed">
              Sediada na <strong>Av. Raul Furquim, 246 em Bebedouro/SP</strong>, a Messa Corretora nasceu com o propósito de oferecer assessoria séria, transparente e próxima a cada cliente. Compreendemos que um seguro representa o esforço de uma vida inteira de conquistas.
            </p>

            <p className="text-base text-[#596273] leading-relaxed">
              Por isso, não operamos com pacotes genéricos: avaliamos detalhadamente os riscos do seu veículo, do seu imóvel ou da sua empresa para garantir apólices precisas, sem surpresas no momento do sinistro.
            </p>

            {/* 4 Elementos Informativos em 2 Colunas com Ícones Azuis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              {pilares.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F3F6FD] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#F3F6FD] text-[#0866C9] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#0866C9]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#062653] leading-tight">{p.titulo}</h4>
                      <p className="text-xs text-[#596273] mt-1 leading-snug">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botão Institucional */}
            <div className="pt-4">
              <a
                href="#cotacao"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Fale com Nossos Corretores</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
