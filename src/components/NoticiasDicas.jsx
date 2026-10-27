import React, { useState } from 'react';
import { Calendar, ArrowRight, BookOpen, X } from 'lucide-react';

export default function NoticiasDicas() {
  const [modalNoticia, setModalNoticia] = useState(null);

  const artigos = [
    {
      id: 1,
      categoria: "Seguro Auto",
      data: "Orientações 2026",
      titulo: "Passo a passo: o que fazer imediatamente em caso de colisão ou sinistro",
      resumo: "Saiba como proceder com segurança, sinalizar o local, registrar as fotos necessárias e acionar a assistência 24h sem dores de cabeça.",
      foto: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
      conteudoCompleto: "No momento de um acidente com veículo, a prioridade absoluta é a integridade física dos ocupantes e terceiros. Verifique se há feridos e, se necessário, acione o resgate (193/192) e a polícia de trânsito (190). Em seguida, sinalize a pista com o triângulo e tire fotos de todos os ângulos dos veículos e do local. Contate imediatamente a central de socorro 24h da sua seguradora para envio de guincho. Na sequência, avise a equipe da Messa Corretora em Bebedouro para acompanharmos o boletim de ocorrência e a vistoria na oficina credenciada."
    },
    {
      id: 2,
      categoria: "Seguro Residencial",
      data: "Dicas de Proteção",
      titulo: "Cuidados essenciais para manter seu lar ou casa de campo protegidos",
      resumo: "Conheça as coberturas para danos elétricos, vendavais e roubo, além dos serviços emergenciais gratuitos de chaveiro e encanador.",
      foto: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      conteudoCompleto: "O Seguro Residencial vai muito além de incêndio e roubo. Uma das coberturas mais acionadas no interior paulista é a de Danos Elétricos, que indeniza aparelhos eletrônicos queimados por oscilações na rede elétrica ou raios. Além disso, a apólice oferece a assistência dia e noite com mão de obra gratuita para desentupimentos, reparos hidráulicos e consertos de linha branca (geladeiras, fogões e máquinas de lavar)."
    },
    {
      id: 3,
      categoria: "Consórcio Porto Seguro",
      data: "Planejamento Financeiro",
      titulo: "Como utilizar lances e saldo do FGTS para acelerar a compra do seu imóvel",
      resumo: "Entenda a mecânica dos lances embutidos, lances diluídos e sorteios mensais sem pagar juros bancários exorbitantes.",
      foto: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop",
      conteudoCompleto: "O consórcio imobiliário é a forma mais inteligente de construir patrimônio sem pagar os juros elevados dos financiamentos tradicionais. Na Porto Seguro, você conta com três opções de lance: o lance embutido (onde utiliza até 30% do próprio crédito para ofertar o lance), o lance diluído (que reduz as parcelas futuras) e o lance fixo. Trabalhadores com carteira assinada também podem empregar o saldo do FGTS para ofertar lances ou quitar parcelas do imóvel."
    }
  ];

  return (
    <section id="noticias" className="py-20 lg:py-24 bg-[#F3F6FD] relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Cabeçalho com Botão à Direita (Estilo Insuren) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#0866C9]/10 text-[#0866C9] text-xs font-bold uppercase tracking-wider">
              Notícias & Orientações
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062653] tracking-tight">
              Informações essenciais para proteger o que você ama
            </h2>
            <p className="text-sm sm:text-base text-[#596273]">
              Artigos práticos e orientações elaboradas para manter nossos clientes sempre bem informados.
            </p>
          </div>

          <a
            href="#cotacao"
            className="self-start md:self-end inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#0866C9] text-[#062653] hover:text-white border border-slate-200 hover:border-[#0866C9] font-semibold text-sm transition-all duration-300 shadow-xs"
          >
            <span>Tire Dúvidas Conosco</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Grade de 3 Cards Editoriais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artigos.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between border border-slate-100"
            >
              <div>
                {/* Fotografia Ampla */}
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <img
                    src={item.foto}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0866C9] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    {item.categoria}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 space-y-3 text-left">
                  <div className="flex items-center gap-2 text-xs text-[#596273]">
                    <Calendar className="w-3.5 h-3.5 text-[#08A9E6]" />
                    <span>{item.data}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#062653] group-hover:text-[#0866C9] transition-colors leading-snug">
                    {item.titulo}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#596273] leading-relaxed">
                    {item.resumo}
                  </p>
                </div>
              </div>

              {/* Link de Leitura */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setModalNoticia(item)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0866C9] hover:text-[#062653] transition-colors group-hover:underline"
                >
                  <span>Ler Artigo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal de Leitura de Notícia */}
      {modalNoticia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#062653]/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 bg-[#062653] text-white flex items-center justify-between shrink-0">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#08A9E6] font-bold">
                  {modalNoticia.categoria}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-['Poppins'] mt-1">
                  {modalNoticia.titulo}
                </h3>
              </div>
              <button
                onClick={() => setModalNoticia(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#596273] leading-relaxed text-left">
              <img
                src={modalNoticia.foto}
                alt={modalNoticia.titulo}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
              <p>{modalNoticia.conteudoCompleto}</p>
              
              <div className="p-4 bg-[#F3F6FD] rounded-xl border border-blue-100 text-xs text-[#062653]">
                <strong>Precisa de apoio na sua apólice?</strong> Entre em contato com a equipe da <strong>Messa Corretora</strong> em Bebedouro pelo telefone <strong>(17) 3342-9191</strong>.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setModalNoticia(null)}
                className="px-5 py-2 bg-[#0866C9] hover:bg-[#062653] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
