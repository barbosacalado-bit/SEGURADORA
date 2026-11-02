import React, { useState } from 'react';
import Logo from './Logo';
import { Phone, Mail, MapPin, Clock, Menu, X, ChevronRight, Headphones, MessageSquare } from 'lucide-react';

export default function Header({ onOpenTelefones, onOpenCentral }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Quem Somos', href: '#sobre' },
    { name: 'Serviços', full: 'Serviços & Seguros', href: '#servicos' },
    { name: 'Cotação', full: 'Cotação Rápida', href: '#cotacao' },
    { name: 'Dúvidas', href: '#faq' },
    { name: 'Notícias', href: '#noticias' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 transition-all w-full">
      {/* Top Bar Institucional */}
      <div className="bg-[#062653] text-slate-300 text-[12px] py-2 px-4 sm:px-6 lg:px-8 border-b border-[#0866C9]/20 hidden md:block">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#08A9E6] shrink-0" />
              Av. Raul Furquim, 246 — Bebedouro / SP
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors hidden lg:flex">
              <Clock className="w-3.5 h-3.5 text-[#08A9E6] shrink-0" />
              Segunda a Sexta: 08h às 18h
            </span>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <a
              href="mailto:MESSACORRETORA@TERRA.COM.BR"
              className="flex items-center gap-2 hover:text-[#08A9E6] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#08A9E6] shrink-0" />
              messacorretora@terra.com.br
            </a>
            <a
              href="tel:01733429191"
              className="flex items-center gap-2 font-semibold text-white hover:text-[#08A9E6] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#08A9E6] shrink-0" />
              (17) 3342-9191
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 lg:gap-4">
        {/* Logomarca Original MESSA CORRETORA */}
        <a href="#inicio" className="group shrink-0">
          <Logo variant="light" />
        </a>

        {/* Desktop Navigation Links (Responsivo inteligente para telas xl e 2xl) */}
        <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] 2xl:text-[14px] font-semibold text-[#062653] hover:text-[#0866C9] transition-colors relative py-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0866C9] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.full ? (
                <>
                  <span>{link.name}</span>
                  <span className="hidden 2xl:inline">{link.full.replace(link.name, '')}</span>
                </>
              ) : (
                link.name
              )}
            </a>
          ))}

          {/* Botão de Telefones Úteis */}
          <button
            onClick={onOpenTelefones}
            className="flex items-center gap-1.5 text-[12.5px] 2xl:text-[13.5px] font-bold text-[#0866C9] hover:text-[#062653] px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap border border-transparent hover:border-blue-100"
            title="Telefones Úteis e Sinistro 24h"
          >
            <Headphones className="w-4 h-4 text-[#08A9E6] shrink-0" />
            <span>Telefones<span className="hidden 2xl:inline"> Úteis</span></span>
          </button>
        </nav>

        {/* Action Buttons Aligned */}
        <div className="hidden sm:flex items-center gap-2 2xl:gap-3 shrink-0">
          {onOpenCentral && (
            <button
              onClick={onOpenCentral}
              className="inline-flex items-center gap-2 h-10 px-3 2xl:px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 text-[#062653] hover:text-[#0866C9] text-[12.5px] 2xl:text-[13px] font-bold border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all whitespace-nowrap"
              title="Acessar Central de Atendimento das Especialistas"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <MessageSquare className="w-3.5 h-3.5 text-[#0866C9] shrink-0" />
              <span>Painel<span className="hidden 2xl:inline"> Atendimento</span></span>
            </button>
          )}

          <a
            href="#cotacao"
            className="inline-flex items-center justify-center h-10 px-3.5 2xl:px-5 py-1.5 rounded-xl bg-gradient-to-r from-[#0866C9] to-[#063f80] hover:from-[#062653] hover:to-[#0866C9] text-white text-[12.5px] 2xl:text-[13.5px] font-bold tracking-wide shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            Solicitar Proposta
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 xl:hidden">
          {onOpenCentral && (
            <button
              onClick={onOpenCentral}
              className="sm:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 text-[#0866C9] text-[12px] font-bold border border-blue-100"
              title="Painel Atendimento"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Painel</span>
            </button>
          )}
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
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-[#062653] hover:text-[#0866C9] font-medium border-b border-slate-100"
              >
                {link.full || link.name}
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
