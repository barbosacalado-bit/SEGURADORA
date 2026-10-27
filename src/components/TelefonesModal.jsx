import React from 'react';
import { Phone, ShieldAlert, X, ExternalLink, Headphones } from 'lucide-react';

export default function TelefonesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const seguradoras = [
    {
      nome: "Porto Seguro",
      assistencia: "4004-7678 / 0800 727 0800",
      sinistro: "0800 727 2766",
      whatsapp: "(11) 3003-9303"
    },
    {
      nome: "Azul Seguros",
      assistencia: "4004-3700 / 0800 703 0203",
      sinistro: "0800 703 1280",
      whatsapp: "(21) 3906-2985"
    },
    {
      nome: "Tokio Marine",
      assistencia: "0800 31 86546",
      sinistro: "0800 31 86546",
      whatsapp: "(11) 99578-6546"
    },
    {
      nome: "Bradesco Seguros",
      assistencia: "4004-2757 / 0800 701 2757",
      sinistro: "0800 701 2757",
      whatsapp: "(11) 4004-2757"
    },
    {
      nome: "Allianz Seguros",
      assistencia: "4090-1110 / 0800 777 7243",
      sinistro: "0800 777 7243",
      whatsapp: "(11) 4090-1110"
    },
    {
      nome: "HDI Seguros",
      assistencia: "3003-5390 / 0800 772 5390",
      sinistro: "0800 772 5390",
      whatsapp: "(11) 3003-5390"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#062653]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#062653] to-[#0866C9] p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-[#08A9E6]" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-['Poppins']">Telefones Úteis & Assistência 24h</h3>
              <p className="text-xs text-blue-100">Canais diretos das seguradoras parceiras em caso de emergência ou sinistro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 bg-[#F3F6FD] rounded-xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#0866C9]" />
              <div>
                <p className="text-sm font-semibold text-[#062653]">Messa Corretora — Atendimento Comercial</p>
                <p className="text-xs text-[#596273]">Horário comercial: Seg a Sex das 08h às 18h em Bebedouro/SP</p>
              </div>
            </div>
            <a
              href="tel:01733429191"
              className="px-4 py-2 bg-[#0866C9] hover:bg-[#062653] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              (17) 3342-9191
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seguradoras.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:border-[#08A9E6] transition-all bg-white shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-[#062653] text-sm">{item.nome}</h4>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-blue-50 text-[#0866C9] rounded-full">
                    24 Horas
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#596273]">
                  <p><span className="font-semibold text-slate-700">Assistência Auto/Residência:</span> {item.assistencia}</p>
                  <p><span className="font-semibold text-slate-700">Aviso de Sinistro:</span> {item.sinistro}</p>
                  <p><span className="font-semibold text-slate-700">WhatsApp Oficial:</span> {item.whatsapp}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Dica importante no momento do sinistro:</strong> Em caso de colisão ou pane, garanta a segurança de todos, fotografe o ocorrido e contate o socorro da sua seguradora acima. Em seguida, informe a equipe da <strong>Messa Corretora</strong> pelo telefone (17) 3342-9191 para darmos andamento à regulação do seu processo.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#062653] hover:bg-[#0866C9] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Fechar Janela
          </button>
        </div>

      </div>
    </div>
  );
}
