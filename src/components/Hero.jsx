import React from 'react';
import { ShieldCheck, ArrowRight, PhoneCall, Star, CheckCircle2, Award, Headphones } from 'lucide-react';

export default function Hero({ onOpenTelefones }) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-[#F3F6FD] via-white to-white py-14 sm:py-20 lg:py-24">
      {/* Elementos gráficos de fundo decorativos suaves (estilo Insuren) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#08A9E6]/10 via-[#0866C9]/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#0866C9]/5 rounded-full blur-2xl pointer-events-none -ml-20"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Coluna Esquerda: Conteúdo Institucional de Grande Impacto */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Etiqueta Superior */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0866C9]/10 border border-[#0866C9]/20 text-[#0866C9] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#08A9E6]" />
              Messa Corretora de Seguros • Bebedouro / SP
            </div>

            {/* ITEM 3: Título Principal voltado para 2027 com destaque premium */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-[#062653] leading-[1.14] tracking-tight">
              Comece 2027 protegendo o que é <br className="hidden sm:inline" />
              <span className="text-[#0866C9] relative inline-block">
                mais valioso
                <svg className="absolute -bottom-2 left-0 w-full h-2.5 text-[#08A9E6]/50" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="6" fill="transparent" />
                </svg>
              </span> para você e sua família.
            </h1>

            {/* Texto Complementar com conteúdo real da Messa */}
            <p className="text-base sm:text-lg text-[#596273] leading-relaxed max-w-xl font-normal">
              Com presença física e consultiva em Bebedouro/SP, conectamos você às maiores seguradoras do Brasil para garantir tranquilidade em automóveis, residências, vida, agronegócio e consórcios.
            </p>

            {/* Ações / Botões */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#cotacao"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white font-semibold text-base shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <span>Simular Meu Seguro</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:01733429191"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3F6FD] text-[#062653] border border-slate-200 hover:border-[#0866C9] font-semibold text-base transition-all duration-300"
              >
                <PhoneCall className="w-4 h-4 text-[#0866C9]" />
                <span>(17) 3342-9191</span>
              </a>
            </div>

            {/* ITEM 1: Badges de Confiança com Destaque Visual Premium */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Badge 1 */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white shadow-xs border border-slate-200/90 hover:border-[#0866C9] hover:shadow-md transition-all duration-300 group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0866C9] to-[#08A9E6] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-bold text-[#062653] leading-tight group-hover:text-[#0866C9] transition-colors">
                      Atendimento Consultivo
                    </p>
                    <p className="text-[10px] text-[#596273] leading-tight mt-0.5">
                      Bebedouro e região
                    </p>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white shadow-xs border border-slate-200/90 hover:border-[#0866C9] hover:shadow-md transition-all duration-300 group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0866C9] to-[#08A9E6] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-bold text-[#062653] leading-tight group-hover:text-[#0866C9] transition-colors">
                      As Melhores Seguradoras
                    </p>
                    <p className="text-[10px] text-[#596273] leading-tight mt-0.5">
                      Porto, Azul, Tokio & mais
                    </p>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white shadow-xs border border-slate-200/90 hover:border-[#0866C9] hover:shadow-md transition-all duration-300 group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0866C9] to-[#08A9E6] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-bold text-[#062653] leading-tight group-hover:text-[#0866C9] transition-colors">
                      Apoio Total no Sinistro
                    </p>
                    <p className="text-[10px] text-[#596273] leading-tight mt-0.5">
                      Suporte ágil e humanizado
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Coluna Direita: Composição Fotográfica Integrada e Humanizada */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[480px] lg:max-w-none">
              
              {/* Moldura orgânica com degradê e sombras suaves */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-[#062653] to-[#0866C9] p-1.5">
                <div className="relative rounded-[22px] overflow-hidden bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop"
                    alt="Família protegida pela Messa Corretora de Seguros"
                    className="w-full h-[420px] sm:h-[480px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  />
                  
                  {/* Degradê sutil de transição inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062653]/60 via-transparent to-transparent"></div>
                  
                  {/* Selo sobreposto no rodapé da imagem */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-[#0866C9] uppercase tracking-wider">Messa Corretora</p>
                      <p className="text-sm font-bold text-[#062653]">Segurança para todas as fases</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-[#F3F6FD] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-[#0866C9]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Flutuante de Apoio (Estilo Insuren) */}
              <div className="absolute -top-6 -left-6 sm:-left-8 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float hidden sm:flex">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0866C9] to-[#08A9E6] text-white flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-xs font-bold text-[#062653] mt-0.5">Tradição & Confiança</p>
                  <p className="text-[10px] text-[#596273]">Bebedouro e Região</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
