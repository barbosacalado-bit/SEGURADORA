import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  ArrowRight, 
  Car, 
  Wheat, 
  Home, 
  Coins, 
  Building2, 
  Shield, 
  RotateCcw,
  MessageSquare,
  Clock,
  ExternalLink
} from 'lucide-react';
import { criarNovoLeadFormulario, obterAtendentePorModalidade } from '../services/atendimentoService';
import { enviarMensagemZApi } from '../services/zapiService';

// Opções de produtos para seleção em 1 clique
const OPCOES_SEGURO = [
  { 
    id: 'auto', 
    titulo: 'Seguro de Veículos', 
    subtitulo: 'Auto, Táxi, Jovem ou Sênior',
    icon: Car,
    categoriaOficial: 'Seguro de Veículos (Auto, Sênior, Jovem, Táxi)',
    cor: 'border-blue-200 hover:border-[#0866C9] hover:bg-blue-50/70 text-[#0866C9]'
  },
  { 
    id: 'agro', 
    titulo: 'Agronegócio & Safra', 
    subtitulo: 'Tratores, Colheitadeiras e Pivô',
    icon: Wheat,
    categoriaOficial: 'Agronegócio (Máquinas / Safra)',
    cor: 'border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50/70 text-emerald-700'
  },
  { 
    id: 'residencial', 
    titulo: 'Residencial & Veraneio', 
    subtitulo: 'Casas, Apartamentos e Sítios',
    icon: Home,
    categoriaOficial: 'Seguro Residencial ou Veraneio',
    cor: 'border-cyan-200 hover:border-cyan-600 hover:bg-cyan-50/70 text-cyan-700'
  },
  { 
    id: 'consorcio', 
    titulo: 'Consórcio Porto Seguro', 
    subtitulo: 'Imóveis, Automóveis e Pesados',
    icon: Coins,
    categoriaOficial: 'Consórcio Imobiliário Porto Seguro',
    cor: 'border-amber-200 hover:border-amber-600 hover:bg-amber-50/70 text-amber-700'
  },
  { 
    id: 'frotas', 
    titulo: 'Frotas & Empresarial', 
    subtitulo: 'Caminhões e CNPJ',
    icon: Building2,
    categoriaOficial: 'Seguro de Frotas e Cargas',
    cor: 'border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50/70 text-indigo-700'
  },
  { 
    id: 'vida', 
    titulo: 'Seguro de Vida', 
    subtitulo: 'Proteção Familiar & Previdência',
    icon: Shield,
    categoriaOficial: 'Seguro de Vida e Família',
    cor: 'border-rose-200 hover:border-rose-600 hover:bg-rose-50/70 text-rose-700'
  }
];

export default function ChatbotMel({ produtoSelecionado, onAbrirCentral }) {
  // Estado do fluxo conversacional: 0 = Nome, 1 = Produto, 2 = WhatsApp, 3 = Detalhes, 4 = Concluído
  const [etapa, setEtapa] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValor, setInputValor] = useState('');
  
  // Dados acumulados do lead
  const [dadosLead, setDadosLead] = useState({
    nome: '',
    categoria: produtoSelecionado || '',
    telefone: '',
    detalhes: ''
  });

  const [leadConcluido, setLeadConcluido] = useState(null);
  const [especialista, setEspecialista] = useState(null);
  const [statusEnvioZApi, setStatusEnvioZApi] = useState(null); // 'enviando' | 'enviado' | 'erro'

  // Histórico de balões de mensagens
  const [mensagens, setMensagens] = useState([
    {
      id: 'msg-ini-1',
      remetente: 'mel',
      texto: 'Olá! Seja muito bem-vindo(a) à Messa Corretora. 😊',
      horario: 'Agora'
    },
    {
      id: 'msg-ini-2',
      remetente: 'mel',
      texto: 'Eu sou a Mel, assistente virtual de seguros aqui em Bebedouro. Vou encontrar a melhor condição de cobertura e desconto para o seu perfil. Como posso te chamar?',
      horario: 'Agora'
    }
  ]);

  const chatEndRef = useRef(null);

  // Rolagem suave automática ao adicionar mensagens
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensagens, isTyping, etapa]);

  // Função auxiliar para adicionar mensagem da Mel com efeito de digitação
  const adicionarMensagemMel = (texto, callbackAposDigitar) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setMensagens(prev => [
        ...prev,
        {
          id: 'msg-mel-' + Date.now(),
          remetente: 'mel',
          texto,
          horario: agora
        }
      ]);
      if (callbackAposDigitar) callbackAposDigitar();
    }, 600);
  };

  // Formatação de máscara do telefone em tempo real
  const handleTelefoneChange = (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (v.length > 5) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    }
    setInputValor(v);
  };

  // 1. Envio do Nome
  const handleEnviarNome = (e) => {
    e.preventDefault();
    const nomeLimpo = inputValor.trim();
    if (!nomeLimpo || nomeLimpo.length < 2) return;

    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMensagens(prev => [
      ...prev,
      { id: 'msg-usr-' + Date.now(), remetente: 'user', texto: nomeLimpo, horario: agora }
    ]);
    setDadosLead(prev => ({ ...prev, nome: nomeLimpo }));
    setInputValor('');

    adicionarMensagemMel(
      `Prazer em te conhecer, ${nomeLimpo.split(' ')[0]}! 🤝\nQual modalidade de seguro você gostaria de cotar hoje com condições exclusivas?`,
      () => setEtapa(1)
    );
  };

  // 2. Escolha do Produto com 1 Clique
  const handleSelecionarProduto = (opcao) => {
    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMensagens(prev => [
      ...prev,
      { id: 'msg-usr-' + Date.now(), remetente: 'user', texto: opcao.titulo, horario: agora }
    ]);
    setDadosLead(prev => ({ ...prev, categoria: opcao.categoriaOficial }));

    adicionarMensagemMel(
      `Excelente escolha! Na área de ${opcao.titulo}, trabalhamos com Porto Seguro, Azul, Tokio Marine e Allianz para buscar o maior desconto de bônus.\n\nPara qual WhatsApp com DDD devemos enviar o comparativo oficial?`,
      () => setEtapa(2)
    );
  };

  // 3. Envio do WhatsApp
  const handleEnviarTelefone = (e) => {
    e.preventDefault();
    const numLimpo = inputValor.replace(/\D/g, '');
    if (numLimpo.length < 10) return;

    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMensagens(prev => [
      ...prev,
      { id: 'msg-usr-' + Date.now(), remetente: 'user', texto: inputValor, horario: agora }
    ]);
    setDadosLead(prev => ({ ...prev, telefone: inputValor }));
    setInputValor('');

    adicionarMensagemMel(
      `Telefone anotado! 📱\nQuer adiantar algum detalhe do bem (ex: modelo do carro, safra/máquina ou ano)? Se preferir, pode clicar em 'Concluir Cotação'.`,
      () => setEtapa(3)
    );
  };

  // 4. Detalhes ou Concluir Cotação
  const handleFinalizarLead = async (detalhesTexto = '') => {
    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (detalhesTexto.trim()) {
      setMensagens(prev => [
        ...prev,
        { id: 'msg-usr-' + Date.now(), remetente: 'user', texto: detalhesTexto.trim(), horario: agora }
      ]);
    }

    const leadAtualizado = {
      nome: dadosLead.nome,
      telefone: dadosLead.telefone,
      email: `${dadosLead.nome.toLowerCase().replace(/\s+/g, '.')}@cliente.com`,
      categoria: dadosLead.categoria,
      mensagem: detalhesTexto.trim() || 'Cotação solicitada através da assistente Mel no portal.'
    };

    // 1. Grava no sistema da Corretora (Mesa Limpa)
    const novoLead = criarNovoLeadFormulario(leadAtualizado);
    const atendenteAlvo = obterAtendentePorModalidade(dadosLead.categoria);
    setLeadConcluido(novoLead);
    setEspecialista(atendenteAlvo);
    setEtapa(4);

    // 2. Dispara Mensagem Real via Z-API Oficial na Nuvem
    setStatusEnvioZApi('enviando');
    try {
      const primeiroNome = dadosLead.nome.split(' ')[0];
      const textoWhatsApp = `*MESSA CORRETORA • PROTOCOLO ${novoLead.protocolo}*\n\nOlá, ${primeiroNome}! Aqui é a *${atendenteAlvo.nome}*, consultora da Messa Corretora.\n\nRecebi sua solicitação de cotação para *${dadosLead.categoria}* que você fez agora mesmo com a Mel no nosso site.\n\nJá estou separando as melhores propostas com desconto de bônus para você. Como posso te ajudar hoje? 🤝`;
      
      const resZApi = await enviarMensagemZApi(dadosLead.telefone, textoWhatsApp);
      if (resZApi.success) {
        setStatusEnvioZApi('enviado');
      } else {
        setStatusEnvioZApi('erro');
      }
    } catch (e) {
      setStatusEnvioZApi('erro');
    }

    // 3. Resposta comemorativa da Mel no chat
    adicionarMensagemMel(
      `Prontinho, ${dadosLead.nome.split(' ')[0]}! 🎉\nSua cotação foi registrada com sucesso sob o protocolo ${novoLead.protocolo}.\nNossa consultora especialista ${atendenteAlvo.nome} já recebeu sua ficha e acabou de te enviar uma mensagem no WhatsApp!`
    );
  };

  // Reiniciar o chat
  const handleReiniciar = () => {
    setEtapa(0);
    setInputValor('');
    setDadosLead({ nome: '', categoria: '', telefone: '', detalhes: '' });
    setLeadConcluido(null);
    setEspecialista(null);
    setStatusEnvioZApi(null);
    setMensagens([
      {
        id: 'msg-ini-1',
        remetente: 'mel',
        texto: 'Olá! Seja muito bem-vindo(a) à Messa Corretora. 😊',
        horario: 'Agora'
      },
      {
        id: 'msg-ini-2',
        remetente: 'mel',
        texto: 'Eu sou a Mel, assistente virtual de seguros aqui em Bebedouro. Como posso te chamar?',
        horario: 'Agora'
      }
    ]);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[650px] relative font-['Poppins',sans-serif]">
      
      {/* ================= CABEÇALHO DO CHATBOT MEL ================= */}
      <div className="bg-[#062653] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#0866C9]/30 shadow-md">
        <div className="flex items-center gap-3">
          {/* Avatar da Mel com Selo Online */}
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0866C9] to-cyan-400 p-0.5 shadow-md overflow-hidden">
              <img
                src="/avatars/mel_oficial.jpg"
                alt="Mel - Assistente Messa"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }
                }}
                className="w-full h-full rounded-[14px] object-cover"
              />
              <div className="w-full h-full rounded-[14px] bg-[#062653] hidden items-center justify-center text-white font-extrabold text-base overflow-hidden">
                <span className="bg-gradient-to-tr from-cyan-300 to-blue-200 bg-clip-text text-transparent font-black">
                  MEL
                </span>
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#062653] rounded-full animate-pulse"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-white text-sm sm:text-base tracking-tight leading-tight">
                Mel • Assistente de Cotações
              </h4>
              <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[9.5px] font-bold border border-emerald-400/30">
                IA Messa
              </span>
            </div>
            <p className="text-[11px] text-blue-200 flex items-center gap-1.5 mt-0.5">
              <span>Messa Corretora • Bebedouro/SP</span>
              <span className="text-white/40">•</span>
              <span className="text-cyan-300 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> Resposta em 1 min
              </span>
            </p>
          </div>
        </div>

        {/* Botão de Reiniciar */}
        <button
          onClick={handleReiniciar}
          className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          title="Reiniciar Atendimento com a Mel"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* ================= CORPO DO CHAT: HISTÓRICO DE MENSAGENS ================= */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-[#F8FAFC]">
        {mensagens.map((msg) => {
          const isMel = msg.remetente === 'mel';
          return (
            <div
              key={msg.id}
              className={`flex ${isMel ? 'justify-start' : 'justify-end'} animate-fadeIn`}
            >
              <div className={`max-w-[85%] sm:max-w-[78%] flex items-end gap-2 ${isMel ? 'flex-row' : 'flex-row-reverse'}`}>
                {isMel && (
                  <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 shadow-2xs border border-[#0866C9]/30">
                    <img 
                      src="/avatars/mel_oficial.jpg" 
                      alt="Mel" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="w-full h-full bg-gradient-to-tr from-[#0866C9] to-cyan-400 text-white hidden items-center justify-center text-[10px] font-black">
                      M
                    </div>
                  </div>
                )}
                
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    isMel
                      ? 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs'
                      : 'bg-[#0866C9] text-white rounded-br-xs font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.texto}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isMel ? 'text-slate-400' : 'text-blue-100'
                    }`}
                  >
                    {msg.horario}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Indicador de Digitação da Mel */}
        {isTyping && (
          <div className="flex justify-start animate-fadeIn">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-[#0866C9]/30">
                <img 
                  src="/avatars/mel_oficial.jpg" 
                  alt="Mel" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="w-full h-full bg-gradient-to-tr from-[#0866C9] to-cyan-400 text-white hidden items-center justify-center text-[10px] font-black">
                  M
                </div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0866C9] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0866C9] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0866C9] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 1: BOTÕES DE PRODUTOS PARA 1 CLIQUE */}
        {etapa === 1 && !isTyping && (
          <div className="pt-2 animate-fadeIn">
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              Toque em uma modalidade para continuar:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OPCOES_SEGURO.map((op) => {
                const IconComponent = op.icon;
                return (
                  <button
                    key={op.id}
                    onClick={() => handleSelecionarProduto(op)}
                    className={`p-3 rounded-2xl border bg-white transition-all text-left flex items-center gap-3 cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02] ${op.cor}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-[#062653] block truncate">
                        {op.titulo}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate">
                        {op.subtitulo}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ETAPA 4: CARD DE CONCLUSÃO & ATRIBUIÇÃO DA ESPECIALISTA */}
        {etapa === 4 && especialista && (
          <div className="bg-emerald-50 border-2 border-emerald-300/80 rounded-2xl p-4 space-y-3 animate-fadeIn shadow-sm">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Solicitação Protocolada • {leadConcluido?.protocolo}</span>
            </div>

            {/* Crachá da Especialista Responsável */}
            <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center gap-3 shadow-xs">
              <img
                src={especialista.avatar}
                alt={especialista.nome}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Especialista Designada
                </span>
                <p className="text-xs font-black text-[#062653] leading-tight truncate">
                  {especialista.nome}
                </p>
                <p className="text-[10.5px] text-[#0866C9] font-medium leading-tight mt-0.5 truncate">
                  {especialista.cargo}
                </p>
              </div>
            </div>

            {/* Status do Disparo Z-API */}
            <div className="text-[11px] text-emerald-800 bg-emerald-100/60 p-2.5 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {statusEnvioZApi === 'enviado' 
                  ? `Mensagem oficial enviada para ${dadosLead.telefone} via WhatsApp!`
                  : statusEnvioZApi === 'enviando'
                  ? 'Conectando à Z-API para envio imediato...'
                  : `Disparo registrado para ${dadosLead.telefone}.`}
              </span>
            </div>

            {/* Ações Rápidas */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href={`https://wa.me/551733429191?text=${encodeURIComponent(`Olá ${especialista.nome}! Sou ${dadosLead.nome} e acabei de cotar ${dadosLead.categoria} pelo site (Protocolo: ${leadConcluido?.protocolo}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Abrir no WhatsApp</span>
              </a>

              {onAbrirCentral && (
                <button
                  type="button"
                  onClick={onAbrirCentral}
                  className="flex-1 py-2.5 px-3 bg-[#0866C9] hover:bg-[#062653] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ver na Mesa de Atendimento</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ================= BARRA INFERIOR DE DIGITAÇÃO / AÇÃO ================= */}
      <div className="p-3.5 bg-white border-t border-slate-200">
        
        {/* ETAPA 0: DIGITAR NOME */}
        {etapa === 0 && (
          <form onSubmit={handleEnviarNome} className="flex items-center gap-2">
            <input
              type="text"
              autoFocus
              placeholder="Digite seu nome (ex: Carlos Silva)..."
              value={inputValor}
              onChange={(e) => setInputValor(e.target.value)}
              className="flex-grow px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0866C9] bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={!inputValor.trim()}
              className="px-5 py-3 rounded-2xl bg-[#0866C9] hover:bg-[#062653] text-white font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40 cursor-pointer shadow-sm"
            >
              <span>Continuar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* ETAPA 1: PRODUTO (Informação para selecionar acima) */}
        {etapa === 1 && (
          <div className="py-2 text-center text-xs text-slate-500 font-medium">
            👆 Selecione uma das modalidades nos cartões acima
          </div>
        )}

        {/* ETAPA 2: DIGITAR WHATSAPP */}
        {etapa === 2 && (
          <form onSubmit={handleEnviarTelefone} className="flex items-center gap-2">
            <input
              type="tel"
              autoFocus
              placeholder="(17) 99999-9999"
              value={inputValor}
              onChange={handleTelefoneChange}
              className="flex-grow px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0866C9] bg-slate-50/50 font-mono"
            />
            <button
              type="submit"
              disabled={inputValor.replace(/\D/g, '').length < 10}
              className="px-5 py-3 rounded-2xl bg-[#0866C9] hover:bg-[#062653] text-white font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40 cursor-pointer shadow-sm"
            >
              <span>Avançar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* ETAPA 3: DETALHES OU PULAR */}
        {etapa === 3 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ex: Corolla 2024, uso pessoal em Bebedouro..."
                value={inputValor}
                onChange={(e) => setInputValor(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleFinalizarLead(inputValor);
                  }
                }}
                className="flex-grow px-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:border-[#0866C9] bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => handleFinalizarLead(inputValor)}
                className="px-4 py-2.5 rounded-2xl bg-[#0866C9] hover:bg-[#062653] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Concluir</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => handleFinalizarLead('')}
              className="w-full text-center text-[11px] text-slate-400 hover:text-[#0866C9] font-medium transition-colors"
            >
              Não tenho detalhes agora, quero concluir a cotação &rarr;
            </button>
          </div>
        )}

        {/* ETAPA 4: CONCLUÍDO (Opção de fazer nova cotação) */}
        {etapa === 4 && (
          <div className="text-center py-1">
            <button
              onClick={handleReiniciar}
              className="text-xs text-[#0866C9] hover:underline font-semibold flex items-center justify-center gap-1 mx-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Realizar outra cotação com a Mel</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
