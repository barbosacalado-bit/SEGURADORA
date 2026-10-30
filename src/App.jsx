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
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import TelefonesModal from './components/TelefonesModal';
import WhatsAppButton from './components/WhatsAppButton';
import CentralAtendimento from './components/CentralAtendimento';

export default function App() {
  const [telefonesOpen, setTelefonesOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [exibirCentralAtendimento, setExibirCentralAtendimento] = useState(false);

  const handleSelectProduto = (produto) => {
    setProdutoSelecionado(produto);
    const el = document.getElementById('cotacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Se o usuário alternar para o Painel da Central de Atendimento
  if (exibirCentralAtendimento) {
    return (
      <CentralAtendimento onVoltarSite={() => setExibirCentralAtendimento(false)} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#596273] font-['Poppins',sans-serif] selection:bg-[#0866C9] selection:text-white">
      
      {/* 01. Cabeçalho Horizontal & Navegação Institucional */}
      <Header 
        onOpenTelefones={() => setTelefonesOpen(true)} 
        onOpenCentral={() => setExibirCentralAtendimento(true)}
      />

      <main className="flex-grow">
        {/* IMAGEM 01: Hero Principal (Título 2027 + Badges com Destaque Premium) */}
        <Hero onOpenTelefones={() => setTelefonesOpen(true)} />

        {/* IMAGEM 02: Seção de Diferenciais (Quebra de linha harmônica) */}
        <Diferenciais />

        {/* IMAGEM 03: Apresentação Institucional Sobre a Messa (Fotos Locais Sem Falhas) */}
        <Sobre />

        {/* IMAGEM 04: Serviços da Corretora (Quebra de linha no título + Banner de Outras Modalidades Premium) */}
        <Servicos onSelectProduto={handleSelectProduto} />

        {/* IMAGEM 05: Seção Institucional em Azul Profundo (#062653) com Atributos Estruturados */}
        <SecaoDestaqueAzul />

        {/* IMAGEM 06: Formulário de Cotação e FAQ Accordion (Box de Dúvidas Premium) */}
        <FormularioFAQ 
          produtoSelecionado={produtoSelecionado} 
          onAbrirCentral={() => setExibirCentralAtendimento(true)}
        />

        {/* IMAGEM 07: Faixa de Indicadores Institucionais (Fundo Azul com Círculos Azul-Ciano) */}
        <IndicadoresFaixa />

        {/* IMAGEM 08: Consultoria e Atendimento Especializado (Quebra de linha no título) */}
        <PilaresEquipe />

        {/* IMAGEM 09: Relação de Confiança (Fundo Suave, Aspas Azuis e Compromisso Institucional) */}
        <DepoimentoInstitucional />

        {/* IMAGEM 10: Notícias e Orientações aos Segurados (3 Cards com Leitura Interativa) */}
        <NoticiasDicas />

        {/* NOVA SEÇÃO: Acompanhe Nosso Instagram (3 Posts com visual idêntico ao Instagram) */}
        <InstagramFeed />
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
