import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Diferenciais from './components/Diferenciais';
import Sobre from './components/Sobre';
import Servicos from './components/Servicos';
import SecaoDestaqueAzul from './components/SecaoDestaqueAzul';
import FormularioFAQ from './components/FormularioFAQ';
import IndicadoresFaixa from './components/IndicadoresFaixa';
import PilaresEquipe from './components/PilaresEquipe';
import DepoimentoInstitucional from './components/DepoimentoInstitucional';
import NoticiasDicas from './components/NoticiasDicas';
import Footer from './components/Footer';
import TelefonesModal from './components/TelefonesModal';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [telefonesOpen, setTelefonesOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleSelectProduto = (produto) => {
    setProdutoSelecionado(produto);
    // Rolagem suave até o formulário de cotação
    const el = document.getElementById('cotacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#596273] font-['Poppins',sans-serif] selection:bg-[#0866C9] selection:text-white">
      
      {/* 01. Cabeçalho Horizontal & Navegação Institucional */}
      <Header onOpenTelefones={() => setTelefonesOpen(true)} />

      <main className="flex-grow">
        {/* IMAGEM 01: Hero Principal com Composição Integrada e Alta Fidelidade */}
        <Hero onOpenTelefones={() => setTelefonesOpen(true)} />

        {/* IMAGEM 02: Seção de Diferenciais (4 Cards Horizontais com Numerações 01 a 04) */}
        <Diferenciais />

        {/* IMAGEM 03: Apresentação Institucional Sobre a Messa (Fotos Sobrepostas + Selo Circular) */}
        <Sobre />

        {/* IMAGEM 04: Serviços da Corretora (4 Cards Fotográficos com Ícones Sobrepostos) */}
        <Servicos onSelectProduto={handleSelectProduto} />

        {/* IMAGEM 05: Seção Institucional em Azul Profundo (#062653) com Atributos Estruturados */}
        <SecaoDestaqueAzul />

        {/* IMAGEM 06: Formulário de Cotação e FAQ Accordion Interativo */}
        <FormularioFAQ produtoSelecionado={produtoSelecionado} />

        {/* IMAGEM 07: Faixa de Indicadores Institucionais (Fundo Azul com Círculos Azul-Ciano) */}
        <IndicadoresFaixa />

        {/* IMAGEM 08: Consultoria e Atendimento Especializado (Pilares Dedicados) */}
        <PilaresEquipe />

        {/* IMAGEM 09: Relação de Confiança (Fundo Suave, Aspas Azuis e Compromisso Institucional) */}
        <DepoimentoInstitucional />

        {/* IMAGEM 10: Notícias e Orientações aos Segurados (3 Cards com Leitura Interativa) */}
        <NoticiasDicas />
      </main>

      {/* IMAGEM 11: Rodapé Institucional em Azul Profundo (#062653) */}
      <Footer onOpenTelefones={() => setTelefonesOpen(true)} />

      {/* Modal Interativo de Telefones Úteis & Sinistros 24h das Seguradoras */}
      <TelefonesModal isOpen={telefonesOpen} onClose={() => setTelefonesOpen(false)} />

      {/* Botão Flutuante de Conversão WhatsApp com Mensagem Pronta */}
      <WhatsAppButton />

    </div>
  );
}
