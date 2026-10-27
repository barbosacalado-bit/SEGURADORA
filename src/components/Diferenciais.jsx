import React from 'react';
import { UserCheck, Building2, HeadphonesIcon, Layers } from 'lucide-react';

export default function Diferenciais() {
  const diferenciais = [
    {
      num: "01",
      icon: UserCheck,
      titulo: "Atendimento Consultivo e Regional",
      descricao: "Presença física na Av. Raul Furquim em Bebedouro/SP com consultores dedicados a entender suas reais prioridades e necessidades patrimoniais."
    },
    {
      num: "02",
      icon: Building2,
      titulo: "As Melhores Seguradoras do País",
      descricao: "Cotações comparativas nas principais companhias autorizadas SUSEP (Porto Seguro, Azul, Tokio Marine e mais), garantindo a melhor relação custo-benefício."
    },
    {
      num: "03",
      icon: HeadphonesIcon,
      titulo: "Suporte Total no Aviso de Sinistro",
      descricao: "Acompanhamento humanizado e ágil no momento mais importante. Cuidamos dos trâmites com a seguradora para liberar sua indenização ou reparo."
    },
    {
      num: "04",
      icon: Layers,
      titulo: "Soluções Sob Medida para Você",
      descricao: "Planos personalizados para pessoas físicas e jurídicas: automóveis, residências, vida, frotas empresariais, agronegócios e consórcios imobiliários."
    }
  ];

  return (
    <section id="diferenciais" className="py-20 bg-[#F3F6FD] relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Cabeçalho Centralizado da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0866C9]/10 text-[#0866C9] text-xs font-bold uppercase tracking-wider">
            Por Que Escolher a Messa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062653] tracking-tight">
            Diferenciais que garantem a sua total tranquilidade
          </h2>
          <p className="text-sm sm:text-base text-[#596273]">
            Mais do que vender seguros, entregamos proteção estratégica e suporte contínuo para o que você conquistou.
          </p>
        </div>

        {/* Grade de 4 Cards (desktop 4 cols, tablet 2 cols, mobile 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {diferenciais.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-7 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between border-b-4 border-transparent hover:border-[#0866C9] overflow-hidden"
              >
                {/* Numeração Decorativa Grande com Contorno Suave */}
                <div className="absolute top-4 right-5 text-4xl sm:text-5xl font-extrabold text-[#08A9E6]/20 select-none group-hover:text-[#0866C9]/25 transition-colors font-['Poppins']">
                  {item.num}
                </div>

                <div className="space-y-5">
                  {/* Ícone Vetorial Azul */}
                  <div className="w-14 h-14 rounded-xl bg-[#F3F6FD] group-hover:bg-[#0866C9] text-[#0866C9] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Título */}
                  <h3 className="text-lg font-bold text-[#062653] leading-snug group-hover:text-[#0866C9] transition-colors">
                    {item.titulo}
                  </h3>

                  {/* Pequena Descrição */}
                  <p className="text-sm text-[#596273] leading-relaxed">
                    {item.descricao}
                  </p>
                </div>

                {/* Linha azul sutil na base */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#0866C9] group-hover:text-[#062653] transition-colors">
                  <span>Compromisso Messa</span>
                  <div className="w-6 h-[2px] bg-[#08A9E6] group-hover:w-10 transition-all"></div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
