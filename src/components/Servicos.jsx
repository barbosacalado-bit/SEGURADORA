import React from 'react';
import { Car, Home, HeartPulse, Landmark, ArrowRight, ExternalLink } from 'lucide-react';

export default function Servicos({ onSelectProduto }) {
  const servicos = [
    {
      id: "auto",
      titulo: "Seguro de Veículos",
      subtitulo: "Auto tradicional, Sênior, Jovem e Táxi",
      descricao: "Cobertura completa contra colisão, roubo, furto, terceiros, socorro 24h com guincho e carro reserva com as melhores seguradoras.",
      foto: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
      icon: Car,
      linkExterno: "https://www.porto.vc/SEGUROAUTO_27910J_4784c94fc2e644a9ac41e30c27ba23a8",
      cta: "Cotar Seguro Auto"
    },
    {
      id: "residencial",
      titulo: "Seguro para Imóveis",
      subtitulo: "Residencial urbano, Veraneio e Condomínio",
      descricao: "Proteja sua casa ou imóvel de veraneio contra incêndio, vendaval, danos elétricos e conte com chaveiro, encanador e eletricista 24h.",
      foto: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      icon: Home,
      linkExterno: null,
      cta: "Cotar Seguro Residencial"
    },
    {
      id: "vida",
      titulo: "Seguro de Vida e Família",
      subtitulo: "Vida Mais Mulher, Vida On e Acidentes",
      descricao: "Garantia de amparo e tranquilidade financeira para seus entes queridos, com coberturas em vida, doenças graves e diárias de internação.",
      foto: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop",
      icon: HeartPulse,
      linkExterno: null,
      cta: "Cotar Seguro Vida"
    },
    {
      id: "consorcio",
      titulo: "Consórcio Imobiliário & Auto",
      subtitulo: "Porto Seguro: Créditos de 55 mil a 500 mil",
      descricao: "Conquiste seu imóvel ou troque de veículo sem juros. Parcelas acessíveis, até 200 meses para pagar, lances embutidos/diluídos e uso de FGTS.",
      foto: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop",
      icon: Landmark,
      linkExterno: null,
      cta: "Simular Consórcio"
    }
  ];

  return (
    <section id="servicos" className="py-20 lg:py-24 bg-[#F3F6FD] relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0866C9]/10 text-[#0866C9] text-xs font-bold uppercase tracking-wider">
            Nossas Soluções
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062653] tracking-tight">
            Seguros e serviços planejados para você
          </h2>
          <p className="text-sm sm:text-base text-[#596273]">
            Produtos estruturados sob medida com as melhores garantias do mercado securitário brasileiro.
          </p>
        </div>

        {/* Grade de 4 Cards Fotográficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {servicos.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between border border-slate-100"
              >
                <div>
                  {/* Fotografia Superior com Altura Consistente */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                    <img
                      src={item.foto}
                      alt={item.titulo}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062653]/70 via-transparent to-transparent"></div>

                    {/* Ícone Azul Sobreposto à Fotografia (Estilo Insuren) */}
                    <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0866C9] to-[#08A9E6] text-white flex items-center justify-center shadow-lg border-2 border-white transform group-hover:rotate-6 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-6 pt-5 space-y-2.5">
                    <span className="text-[11px] font-semibold text-[#0866C9] uppercase tracking-wide block">
                      {item.subtitulo}
                    </span>
                    <h3 className="text-lg font-bold text-[#062653] group-hover:text-[#0866C9] transition-colors leading-snug">
                      {item.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#596273] leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="p-6 pt-0">
                  {item.linkExterno ? (
                    <div className="space-y-2">
                      <a
                        href="#cotacao"
                        onClick={() => onSelectProduto && onSelectProduto(item.titulo)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xs"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href={item.linkExterno}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center block text-[11px] text-[#0866C9] hover:underline"
                      >
                        Contratação direta online (Porto Seguro) &rarr;
                      </a>
                    </div>
                  ) : (
                    <a
                      href="#cotacao"
                      onClick={() => onSelectProduto && onSelectProduto(item.titulo)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xs"
                    >
                      <span>{item.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Categorias adicionais mapeadas da Messa (Agronegócio, Previdência e Acidentes Pessoais) */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-base font-bold text-[#062653]">Procura outras modalidades de seguro?</h4>
            <p className="text-xs sm:text-sm text-[#596273] mt-0.5">
              Também cotamos <strong>Agronegócio</strong> (máquinas agrícolas, lavoura e rebanho), <strong>Previdência Privada</strong> e <strong>Acidentes Pessoais</strong>.
            </p>
          </div>
          <a
            href="#cotacao"
            className="shrink-0 px-6 py-2.5 rounded-xl bg-white border border-[#0866C9] text-[#0866C9] hover:bg-[#0866C9] hover:text-white font-semibold text-xs sm:text-sm transition-all"
          >
            Fazer Cotação Especial
          </a>
        </div>

      </div>
    </section>
  );
}
