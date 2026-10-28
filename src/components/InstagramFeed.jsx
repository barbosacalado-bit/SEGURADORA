import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, CheckCircle2, ArrowRight } from 'lucide-react';

// Ícone vetorial oficial do Instagram
function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramFeed() {
  const [likes, setLikes] = useState({ 0: 248, 1: 312, 2: 189 });
  const [liked, setLiked] = useState({ 0: false, 1: false, 2: false });

  const toggleLike = (index) => {
    setLiked(prev => ({ ...prev, [index]: !prev[index] }));
    setLikes(prev => ({ ...prev, [index]: prev[index] + (liked[index] ? -1 : 1) }));
  };

  const posts = [
    {
      foto: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
      categoria: "Proteção Veicular",
      legenda: "Mais um veículo protegido e cliente com tranquilidade total nas estradas de Bebedouro e região! 🚗✨ Assistência 24h com guincho ilimitado e as melhores coberturas.",
      tempo: "HÁ 2 DIAS",
      comentarios: 14
    },
    {
      foto: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      categoria: "Dicas Residenciais",
      legenda: "Você sabia que oscilações elétricas e queima de eletrodomésticos têm cobertura no Seguro Residencial? 🏡⚡ Proteja seu patrimônio sem pagar caro por isso.",
      tempo: "HÁ 4 DIAS",
      comentarios: 19
    },
    {
      foto: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=600&auto=format&fit=crop",
      categoria: "Consórcio Imobiliário",
      legenda: "Conquista do mês! O sonho da casa própria realizado através do Consórcio Porto Seguro, sem pagar juros bancários e com uso do FGTS. 🔑🏠",
      tempo: "HÁ 6 DIAS",
      comentarios: 27
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Cabeçalho da Faixa */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 text-left max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100 text-xs font-bold uppercase tracking-wider">
              <InstagramIcon className="w-3.5 h-3.5" />
              Siga Nossas Redes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062653] tracking-tight">
              Acompanhe nosso Instagram
            </h2>
            <p className="text-sm sm:text-base text-[#596273]">
              Fique por dentro das novidades, dicas de segurança e momentos da <strong>@messacorretora</strong> em Bebedouro/SP.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-end inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@messacorretora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Grade de 3 Posts Idênticos ao Formato do Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Header do Post */}
              <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  {/* Avatar com Borda Gradiente de Story */}
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600">
                    <div className="w-9 h-9 rounded-full bg-[#062653] p-1.5 flex items-center justify-center text-white border-2 border-white">
                      <span className="font-extrabold text-[11px] tracking-tighter">MC</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#062653]">messacorretora</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#08A9E6] fill-current" />
                    </div>
                    <span className="text-[10px] text-slate-400 block">Bebedouro, São Paulo</span>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-1" aria-label="Opções">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Imagem Quadrada 1:1 do Post */}
              <div className="relative aspect-square overflow-hidden bg-slate-100 group">
                <img
                  src={post.foto}
                  alt={`Post Messa Corretora ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm pointer-events-none">
                  <span className="flex items-center gap-1.5 drop-shadow-md">
                    <Heart className="w-5 h-5 fill-white text-white" /> {likes[idx]}
                  </span>
                  <span className="flex items-center gap-1.5 drop-shadow-md">
                    <MessageCircle className="w-5 h-5 fill-white text-white" /> {post.comentarios}
                  </span>
                </div>
              </div>

              {/* Ações do Post (Like, Comment, Share, Bookmark) */}
              <div className="p-4 pb-2 flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(idx)}
                    className="hover:opacity-75 transition-transform active:scale-125 focus:outline-none"
                    aria-label="Curtir"
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${
                        liked[idx] ? 'text-rose-500 fill-rose-500' : 'text-slate-800'
                      }`}
                    />
                  </button>
                  <button className="hover:opacity-75 focus:outline-none" aria-label="Comentar">
                    <MessageCircle className="w-6 h-6 text-slate-800" />
                  </button>
                  <button className="hover:opacity-75 focus:outline-none" aria-label="Compartilhar">
                    <Send className="w-5 h-5 text-slate-800 -rotate-12" />
                  </button>
                </div>
                <button className="hover:opacity-75 focus:outline-none" aria-label="Salvar">
                  <Bookmark className="w-5 h-5 text-slate-800" />
                </button>
              </div>

              {/* Curtidas e Legenda */}
              <div className="px-4 pb-4 space-y-1.5 text-left text-xs">
                <p className="font-bold text-[#062653]">
                  {likes[idx]} curtidas
                </p>
                <p className="text-[#596273] leading-relaxed">
                  <strong className="text-[#062653] font-bold mr-1.5">messacorretora</strong>
                  {post.legenda}
                </p>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide block pt-1">
                  {post.tempo}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
