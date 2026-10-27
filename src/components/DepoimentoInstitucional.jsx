import React from 'react';
import { Quote, ShieldCheck, Star } from 'lucide-react';

export default function DepoimentoInstitucional() {
  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Grafismo suave de mapa-múndi/malha no fundo (estilo Insuren) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <svg className="w-[900px] h-[500px]" viewBox="0 0 1000 500" fill="currentColor">
          <circle cx="200" cy="150" r="80" />
          <circle cx="350" cy="200" r="100" />
          <circle cx="600" cy="180" r="120" />
          <circle cx="780" cy="220" r="90" />
          <circle cx="500" cy="320" r="70" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0866C9]/10 text-[#0866C9] text-xs font-bold uppercase tracking-wider">
            Relação de Confiança
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062653] tracking-tight">
            A tranquilidade dos nossos segurados em primeiro lugar
          </h2>
        </div>

        {/* Bloco Central de Depoimento / Compromisso Institucional (Estilo Insuren) */}
        <div className="max-w-3xl mx-auto text-center relative px-4">
          
          {/* Aspas Grandes em Azul (Estilo Insuren) */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F3F6FD] text-[#0866C9] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 rotate-180 fill-current" />
          </div>

          {/* Texto Centralizado Autêntico */}
          <p className="text-lg sm:text-2xl text-[#062653] font-medium leading-relaxed italic mb-8">
            "Um seguro só cumpre o seu verdadeiro propósito quando você tem a tranquilidade de saber que, no momento do imprevisto, haverá um corretor pronto para te atender de forma humana, transparente e resolutiva."
          </p>

          {/* Avaliação por Estrelas */}
          <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-4">
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
          </div>

          {/* Assinatura Institucional */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#0866C9] shadow-md mb-2 p-0.5 bg-white">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#062653] to-[#0866C9] flex items-center justify-center text-white">
                <ShieldCheck className="w-7 h-7 text-[#08A9E6]" />
              </div>
            </div>
            <h4 className="text-base font-bold text-[#062653]">Messa Corretora de Seguros</h4>
            <p className="text-xs text-[#596273]">Atendimento Dedicado aos Segurados de Bebedouro e Região</p>
          </div>

        </div>

      </div>
    </section>
  );
}
