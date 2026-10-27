import React from 'react';
import { MapPin, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export default function IndicadoresFaixa() {
  const indicadores = [
    {
      icon: MapPin,
      titulo: "Bebedouro & Região",
      descricao: "Atendimento consultivo e presença física local em São Paulo"
    },
    {
      icon: ShieldCheck,
      titulo: "Multiseguradoras",
      descricao: "Parcerias com as maiores e mais sólidas companhias do país"
    },
    {
      icon: Clock,
      titulo: "Assistência 24 Horas",
      descricao: "Canais rápidos para socorro emergencial, guincho e reparos"
    },
    {
      icon: CheckCircle,
      titulo: "Soluções Completas",
      descricao: "Coberturas personalizadas para veículos, lares, vidas e empresas"
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 bg-[#062653] text-white overflow-hidden">
      {/* Fotografia de fundo com sobreposição azul profunda */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
          alt="Estrutura e solidez corporativa"
          className="w-full h-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062653] via-[#062653]/95 to-[#062653]"></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {indicadores.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-3.5 group">
                {/* Ícone branco sobre círculo azul-ciano (Estilo Insuren) */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0866C9] to-[#08A9E6] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Informação Principal */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight pt-1">
                  {item.titulo}
                </h3>

                {/* Descrição Inferior */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-[240px]">
                  {item.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
