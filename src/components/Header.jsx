import React, { useState } from 'react';
import Logo from './Logo';
import { Phone, Mail, MapPin, Clock, Menu, X, ChevronRight, Headphones } from 'lucide-react';

export default function Header({ onOpenTelefones }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Quem Somos', href: '#sobre' },
    { name: 'Serviços & Seguros', href: '#servicos' },
    { name: 'Cotação Rápida', href: '#cotacao' },
    { name: 'Dúvidas', href: '#faq' },
    { name: 'Notícias', href: '#noticias' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 transition-all">
      {/* Top Bar Institucional */}
      <div className="bg-[#062653] text-slate-300 text-[12px] py-2 px-4 sm:px-8 border-b border-[#0866C9]/20 hidden md:block">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#08A9E6]" />
              Av. Raul Furquim, 246 — Bebedouro / SP
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Clock className="w-3.5 h-3.5 text-[#08A9E6]" />
              Segunda a Sexta: 08h às 18h
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:MESSACORRETORA@TERRA.COM.BR"
              className="flex items-center gap-2 hover:text-[#08A9E6] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#08A9E6]" />
              messacorretora@terra.com.br
            </a>
            <a
              href="tel:01733429191"
              className="flex items-center gap-2 font-semibold text-white hover:text-[#08A9E6] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#08A9E6]" />
              (17) 3342-9191
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logomarca Original MESSA CORRETORA */}
        <a href="#inicio" className="group">
          <Logo variant="light" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[14.5px] font-medium text-[#062653] hover:text-[#0866C9] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0866C9] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}

          {/* Botão de Telefones Úteis */}
          <button
            onClick={onOpenTelefones}
            className="flex items-center gap-1.5 text-[14px] font-semibold text-[#0866C9] hover:text-[#062653] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
            title="Telefones Úteis e Sinistro 24h"
          >
            <Headphones className="w-4 h-4 text-[#08A9E6]" />
            Telefones Úteis
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#cotacao"
            className="px-5 py-2.5 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white text-[14px] font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Solicitar Proposta
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#062653] hover:text-[#0866C9] rounded-lg focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-[#062653] hover:text-[#0866C9] font-medium border-b border-slate-100"
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTelefones();
              }}
              className="flex items-center justify-between py-2 text-[#0866C9] font-semibold border-b border-slate-100"
            >
              <span className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                Telefones Úteis & Sinistro 24h
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="#cotacao"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#0866C9] hover:bg-[#062653] text-white font-semibold rounded-xl transition-colors"
              >
                Solicitar Cotação Online
              </a>
              <div className="text-xs text-[#596273] text-center pt-2 space-y-1">
                <p>Av. Raul Furquim, 246 — Bebedouro / SP</p>
                <p>Telefone: (17) 3342-9191</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
