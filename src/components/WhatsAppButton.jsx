import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  // Número comercial ou de atendimento da corretora
  // Telefone fixo da Messa é (17) 3342-9191
  const phoneNumber = "551733429191";
  const defaultMessage = encodeURIComponent("Olá! Gostaria de informações e uma cotação de seguro com a Messa Corretora.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline-block font-semibold text-sm tracking-wide">
        Fale no WhatsApp
      </span>
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-700"></span>
      </span>
    </a>
  );
}
