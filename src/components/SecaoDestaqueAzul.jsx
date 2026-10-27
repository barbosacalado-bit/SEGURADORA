import React from 'react';
import { ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';

export default function SecaoDestaqueAzul() {
  const atributos = [
    {
      nome: "Atendimento Consultivo e Humanizado",
      destaque: "Dedicado",
      largura: "95%"
    },
    {
      nome: "Parceria com as Maiores Seguradoras do Brasil",
      destaque: "Oficial",
      largura: "100%"
    },
    {
      nome: "Agilidade na Regulação e Suporte em Sinistros",
      destaque: "Prioritário",
      largura: "92%"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#062653] text-white relative overflow-hidden">
      {/* Elementos gráficos decorativos de iluminação azul no fundo */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0866C9]/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#08A9E6]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna Esquerda: Texto e Barras de Indicadores Institucionais */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Etiqueta Ciano */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#08A9E6] text-xs font-bold uppercase tracking-wider">
              Excelência em Seguros • Bebedouro / SP
            </div>

            {/* Título Grande em Branco */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight tracking-tight">
              Por que proteger seu patrimônio com a assessoria da Messa Corretora?
            </h2>

            {/* Texto Institucional */}
            <p className="text-base text-slate-300 leading-relaxed max-w-xl">
              Contratar um seguro não é simplesmente escolher uma apólice automática pela internet. É ter a segurança de contar com um corretor que defende seus interesses, compreende as particularidades de cada contrato e presta auxílio imediato quando imprevistos acontecem.
            </p>

            {/* Indicadores Horizontais (Estilo Insuren - sem números inventados) */}
            <div className="space-y-5 pt-3">
              {atributos.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#08A9E6]" />
                      {item.nome}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[#08A9E6] font-bold">
                      {item.destaque}
                    </span>
                  </div>

                  {/* Barra com preenchimento em azul-ciano e fundo azul suave */}
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#0866C9] to-[#08A9E6] rounded-full transition-all duration-1000"
                      style={{ width: item.largura }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chamada para Contato Direto */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="tel:01733429191"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0866C9] hover:bg-[#08A9E6] text-white font-semibold text-sm transition-all shadow-lg hover:shadow-cyan-500/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Ligar Agora: (17) 3342-9191</span>
              </a>
            </div>

          </div>

          {/* Coluna Direita: Fotografia Orgânica de Atendimento com Profundidade */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              
              {/* Foto com borda orgânica e sombra intensa */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 p-2 bg-gradient-to-br from-white/10 to-transparent">
                <div className="rounded-[20px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                    alt="Consultoria de seguros na Messa Corretora"
                    className="w-full h-[380px] sm:h-[440px] object-cover object-center"
                  />
                </div>
              </div>

              {/* Box flutuante de autoridade */}
              <div className="absolute -bottom-6 -left-6 bg-white text-[#062653] p-5 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 max-w-[280px]">
                <div className="w-12 h-12 rounded-xl bg-[#0866C9] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#08A9E6]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0866C9]">Compromisso</p>
                  <p className="text-sm font-extrabold text-[#062653] leading-tight">Segurança jurídica e tranquilidade real</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
