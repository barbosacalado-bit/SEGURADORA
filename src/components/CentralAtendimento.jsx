import React, { useState, useEffect, useRef } from 'react';
import { 
  ATENDENTES, 
  carregarAtendimentos, 
  salvarAtendimentos 
} from '../services/atendimentoService';
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  User, 
  Phone, 
  Mail, 
  ArrowRightLeft, 
  Archive, 
  Search, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Tag, 
  FileText, 
  AlertCircle,
  X,
  Sparkles,
  HelpCircle,
  Eye,
  LogOut
} from 'lucide-react';

export default function CentralAtendimento({ onVoltarSite }) {
  // Atendente ativa nesta aba/janela (padrão Kamila)
  const [atendenteAtualId, setAtendenteAtualId] = useState(() => {
    return localStorage.getItem('messa_sessao_atendente_id') || 'kamila';
  });

  const [atendimentos, setAtendimentos] = useState([]);
  const [atendimentoSelecionadoId, setAtendimentoSelecionadoId] = useState(null);
  const [textoMensagem, setTextoMensagem] = useState('');
  
  // Status da Conexão Real com o WhatsApp via Gateway Baileys
  const [gatewayStatus, setGatewayStatus] = useState({
    status: 'VERIFICANDO',
    phone: null,
    qrCode: null
  });
  const [modalQrCodeOpen, setModalQrCodeOpen] = useState(false);

  // Consulta o Gateway a cada 3 segundos para sincronizar o status
  useEffect(() => {
    const checarStatus = async () => {
      try {
        const url = window.location.hostname === 'localhost' 
          ? 'http://localhost:3001/status' 
          : 'https://large-teeth-live.loca.lt/status';

        const res = await fetch(url, {
          headers: { 'bypass-tunnel-reminder': 'true' }
        });
        if (res.ok) {
          const data = await res.json();
          setGatewayStatus(data);
        }
      } catch (e) {
        // Gateway ainda iniciando ou offline
      }
    };

    checarStatus();
    const interval = setInterval(checarStatus, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Controle de Abas: 'ativas' (Mesa Limpa) vs 'historico' (Arquivo/Pesquisa)
  const [abaAtual, setAbaAtual] = useState('ativas'); 
  const [termoBusca, setTermoBusca] = useState('');

  // Modais de Ação Rápida
  const [modalTransferirOpen, setModalTransferirOpen] = useState(false);
  const [modalNotaInternaOpen, setModalNotaInternaOpen] = useState(false);
  const [notaInternaTexto, setNotaInternaTexto] = useState('');
  const [atendenteDestinoId, setAtendenteDestinoId] = useState('');

  const messagesEndRef = useRef(null);

  // Atendente objeto atual
  const atendenteAtual = ATENDENTES.find(a => a.id === atendenteAtualId) || ATENDENTES[0];

  // Troca de sessão
  const handleTrocarAtendente = (novoId) => {
    setAtendenteAtualId(novoId);
    localStorage.setItem('messa_sessao_atendente_id', novoId);
    setAtendimentoSelecionadoId(null);
  };

  // Carrega e ouve mudanças entre abas/navegadores via storage
  useEffect(() => {
    const atualizar = () => {
      const lista = carregarAtendimentos();
      setAtendimentos(lista);
    };

    atualizar();
    window.addEventListener('storage', atualizar);
    return () => window.removeEventListener('storage', atualizar);
  }, []);

  // Rolagem suave para o fim das mensagens ao interagir
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [atendimentoSelecionadoId, atendimentos]);

  // Filtra as conversas para manter a "MESA LIMPA"
  // Só aparecem:
  // 1) Aguardando (para todos os autorizados daquela área)
  // 2) Em Atendimento atribuídas à atendente atual
  const atendimentosAtivos = atendimentos.filter(at => {
    if (at.status === 'encerrado') return false; // Encerrados somem da tela de trabalho!
    return at.atendenteId === atendenteAtualId || at.status === 'aguardando';
  });

  // Histórico Geral (pesquisa discreta)
  const atendimentosHistorico = atendimentos.filter(at => {
    if (!termoBusca.trim()) return at.status === 'encerrado';
    const termo = termoBusca.toLowerCase();
    return (
      at.cliente.nome.toLowerCase().includes(termo) ||
      at.cliente.telefone.toLowerCase().includes(termo) ||
      at.categoria.toLowerCase().includes(termo) ||
      at.protocolo.toLowerCase().includes(termo)
    );
  });

  // Atendimento atualmente aberto na coluna central
  const atendimentoAtivo = atendimentos.find(a => a.id === atendimentoSelecionadoId) || null;
  const atendenteTitular = ATENDENTES.find(a => a.id === atendimentoAtivo?.atendenteId) || atendenteAtual;

  // Envio de nova mensagem pela atendente (Plugado no WhatsApp Real)
  const handleEnviarMensagem = async (e) => {
    e.preventDefault();
    if (!textoMensagem.trim() || !atendimentoAtivo) return;

    const textoFormatado = `[${atendenteAtual.nome} - Messa Corretora]:\n${textoMensagem.trim()}`;
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Dispara via WhatsApp Real através do nosso Gateway Baileys
    try {
      const endpoint = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/send-message' 
        : 'https://large-teeth-live.loca.lt/send-message';

      fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'bypass-tunnel-reminder': 'true'
        },
        body: JSON.stringify({
          phone: atendimentoAtivo.cliente.telefone,
          text: textoFormatado
        })
      }).catch(err => console.log('Envio WhatsApp local/background:', err));
    } catch (err) {
      console.error('Erro ao conectar ao gateway:', err);
    }

    const novaMsg = {
      id: 'msg-' + Date.now(),
      remetente: 'atendente',
      atendenteId: atendenteAtual.id,
      nome: atendenteAtual.nome,
      texto: textoMensagem.trim(),
      horario: hora
    };

    const listaAtualizada = atendimentos.map(at => {
      if (at.id === atendimentoAtivo.id) {
        return {
          ...at,
          status: 'em_atendimento',
          atendenteId: atendenteAtual.id,
          mensagens: [...at.mensagens, novaMsg]
        };
      }
      return at;
    });

    salvarAtendimentos(listaAtualizada);
    setAtendimentos(listaAtualizada);
    setTextoMensagem('');
  };

  // Simular resposta do cliente (ideal para a apresentação ao Dono)
  const handleSimularRespostaCliente = () => {
    if (!atendimentoAtivo) return;
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const novaMsg = {
      id: 'msg-' + Date.now(),
      remetente: 'cliente',
      texto: 'Perfeito, obrigado pelo retorno rápido! Gostaria de receber os valores comparativos em PDF, por favor.',
      horario: hora
    };

    const listaAtualizada = atendimentos.map(at => {
      if (at.id === atendimentoAtivo.id) {
        return {
          ...at,
          mensagens: [...at.mensagens, novaMsg]
        };
      }
      return at;
    });

    salvarAtendimentos(listaAtualizada);
    setAtendimentos(listaAtualizada);
  };

  // Finalizar atendimento -> SOME DA GRID DE TRABALHO
  const handleFinalizarAtendimento = () => {
    if (!atendimentoAtivo) return;
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const eventoFechamento = {
      id: 'msg-' + Date.now(),
      remetente: 'sistema',
      tipo: 'evento',
      texto: `Atendimento concluído por ${atendenteAtual.nome}. Movido para o histórico da corretora.`,
      horario: hora
    };

    const listaAtualizada = atendimentos.map(at => {
      if (at.id === atendimentoAtivo.id) {
        return {
          ...at,
          status: 'encerrado',
          mensagens: [...at.mensagens, eventoFechamento]
        };
      }
      return at;
    });

    salvarAtendimentos(listaAtualizada);
    setAtendimentos(listaAtualizada);
    setAtendimentoSelecionadoId(null);
  };

  // Transferência para outra Atendente com Passagem Oficial de Bastão
  const handleConfirmarTransferencia = () => {
    if (!atendimentoAtivo || !atendenteDestinoId) return;
    const destino = ATENDENTES.find(a => a.id === atendenteDestinoId);
    if (!destino) return;

    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const mensagensAdicionais = [];

    // 1. Se houver nota interna (amarela, sigilosa para a equipe)
    if (notaInternaTexto.trim()) {
      mensagensAdicionais.push({
        id: 'msg-nota-' + Date.now(),
        remetente: 'nota_interna',
        atendenteNome: atendenteAtual.nome,
        texto: notaInternaTexto.trim(),
        horario: hora
      });
    }

    // 2. Marco Visual Institucional: Passagem de Responsabilidade ("A Bola agora está com...")
    mensagensAdicionais.push({
      id: 'msg-transf-' + Date.now(),
      remetente: 'sistema',
      tipo: 'transferencia_passagem',
      deAtendente: {
        id: atendenteAtual.id,
        nome: atendenteAtual.nome,
        cargo: atendenteAtual.cargo,
        avatar: atendenteAtual.avatar
      },
      paraAtendente: {
        id: destino.id,
        nome: destino.nome,
        cargo: destino.cargo,
        avatar: destino.avatar
      },
      motivo: notaInternaTexto.trim() || null,
      texto: `Conversa transferida de ${atendenteAtual.nome} para ${destino.nome}.`,
      horario: hora
    });

    // 3. Apresentação Oficial da Nova Responsável no Chat (Direta e Sem Redundâncias)
    const primeiroNome = atendimentoAtivo.cliente?.nome ? atendimentoAtivo.cliente.nome.split(' ')[0] : 'Cliente';
    const textoEntrada = `Olá, ${primeiroNome}! Minha colega ${atendenteAtual.nome} me repassou o seu contato e estou assumindo o seu atendimento a partir de agora. Como posso te auxiliar hoje?`;

    mensagensAdicionais.push({
      id: 'msg-apres-transf-' + (Date.now() + 1),
      remetente: 'atendente',
      tipo: 'apresentacao_card',
      atendenteId: destino.id,
      avatar: destino.avatar,
      nome: destino.nome,
      cargo: destino.cargo,
      isTransferencia: true,
      deAtendenteNome: atendenteAtual.nome,
      texto: textoEntrada,
      horario: hora
    });

    const listaAtualizada = atendimentos.map(at => {
      if (at.id === atendimentoAtivo.id) {
        return {
          ...at,
          atendenteId: destino.id,
          status: 'em_atendimento',
          mensagens: [...at.mensagens, ...mensagensAdicionais]
        };
      }
      return at;
    });

    salvarAtendimentos(listaAtualizada);
    setAtendimentos(listaAtualizada);
    setModalTransferirOpen(false);
    setNotaInternaTexto('');
    setAtendenteDestinoId('');
    
    // Altera a sessão ativa para a nova atendente, para que a tela mostre imediatamente o resultado
    setAtendenteAtualId(destino.id);
    localStorage.setItem('messa_sessao_atendente_id', destino.id);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-['Poppins',sans-serif] flex flex-col text-[#062653]">
      
      {/* BARRA SUPERIOR EXECUTIVA DA MESSA CORRETORA */}
      <header className="bg-[#062653] text-white border-b border-[#0866C9]/30 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md">
        
        {/* Identidade Visual Messa */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0866C9] to-cyan-400 flex items-center justify-center font-bold text-white shadow-inner">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base">MESSA CORRETORA</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0866C9] text-white">
                CENTRAL WHATSAPP
              </span>
            </div>
            <p className="text-xs text-blue-200">Painel Unificado Multi-Atendentes • Bebedouro/SP</p>
          </div>
        </div>

        {/* SELETOR DE LOGIN (Para alternar entre Kamila, Bia, Amanda e Júnior nas abas do Chrome/Firefox) */}
        <div className="flex items-center gap-3 bg-white/10 p-2 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 px-2">
            <img 
              src={atendenteAtual.avatar} 
              alt={atendenteAtual.nome} 
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-white/20"
            />
            <div className="text-left hidden md:block">
              <p className="text-sm font-bold text-white leading-tight">{atendenteAtual.nome}</p>
              <p className="text-xs text-blue-200">{atendenteAtual.cargo}</p>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/20"></div>

          {/* Troca Rápida de Atendente */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-blue-200 hidden lg:inline mr-1 font-medium">Operar como:</span>
            {ATENDENTES.map((at) => (
              <button
                key={at.id}
                onClick={() => handleTrocarAtendente(at.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-xl font-semibold transition-all ${
                  atendenteAtualId === at.id 
                    ? 'bg-[#0866C9] text-white shadow-md ring-2 ring-white/40 scale-105' 
                    : 'text-blue-100 hover:bg-white/15'
                }`}
                title={`${at.nome} - ${at.cargo}`}
              >
                {at.nome.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* CONEXÃO COM O WHATSAPP REAL */}
        <div className="flex items-center gap-2">
          {gatewayStatus.status === 'CONNECTED' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-emerald-100">WhatsApp Conectado</span>
              {gatewayStatus.phone && (
                <span className="text-[10px] text-emerald-300">({gatewayStatus.phone})</span>
              )}
            </div>
          ) : (
            <button
              onClick={() => setModalQrCodeOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-all shadow-sm"
              title="Clique para ler o QR Code e conectar seu WhatsApp"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Conectar WhatsApp (QR Code)</span>
            </button>
          )}

          {/* Botão de Retornar ao Site Institucional */}
          <button
            onClick={onVoltarSite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-blue-100 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Ver Site</span>
          </button>
        </div>
      </header>

      {/* ÁREA DE TRABALHO DA ATENDENTE (3 COLUNAS HARMONIOSAS) */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden max-w-[1600px] w-full mx-auto p-3 sm:p-4 gap-4">
        
        {/* ================= COLUNA 1: FILA DE ATENDIMENTOS (MESA LIMPA) ================= */}
        <div className="w-full md:w-80 lg:w-96 bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col overflow-hidden">
          
          {/* Header da Coluna com Abas "Ativas" e "Histórico" */}
          <div className="p-3.5 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#062653]">
                  {abaAtual === 'ativas' ? 'Mesa de Atendimento' : 'Histórico Completo'}
                </h2>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#0866C9] border border-blue-100">
                {abaAtual === 'ativas' ? `${atendimentosAtivos.length} ativos` : 'Consultas'}
              </span>
            </div>

            {/* Alternador de Abas */}
            <div className="grid grid-cols-2 gap-1 bg-slate-200/60 p-1 rounded-xl text-xs">
              <button
                onClick={() => setAbaAtual('ativas')}
                className={`py-1.5 rounded-lg font-semibold transition-all ${
                  abaAtual === 'ativas' 
                    ? 'bg-white text-[#0866C9] shadow-sm' 
                    : 'text-slate-600 hover:text-[#062653]'
                }`}
              >
                Mesa Limpa ({atendimentosAtivos.length})
              </button>
              <button
                onClick={() => setAbaAtual('historico')}
                className={`py-1.5 rounded-lg font-semibold transition-all ${
                  abaAtual === 'historico' 
                    ? 'bg-white text-[#0866C9] shadow-sm' 
                    : 'text-slate-600 hover:text-[#062653]'
                }`}
              >
                Histórico
              </button>
            </div>

            {/* Campo de Busca no Histórico */}
            {abaAtual === 'historico' && (
              <div className="mt-2.5 relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar cliente, fone, seguro..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#0866C9]"
                />
              </div>
            )}
          </div>

          {/* LISTAGEM DOS ATENDIMENTOS */}
          <div className="flex-grow overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
            
            {abaAtual === 'ativas' ? (
              atendimentosAtivos.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-[#062653]">Mesa 100% Limpa!</p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                    Você não tem conversas pendentes. Quando um novo lead entrar pelo site, ele aparecerá aqui automaticamente.
                  </p>
                </div>
              ) : (
                atendimentosAtivos.map(at => {
                  const isSelected = at.id === atendimentoSelecionadoId;
                  const ultimaMsg = at.mensagens[at.mensagens.length - 1];

                  return (
                    <div
                      key={at.id}
                      onClick={() => setAtendimentoSelecionadoId(at.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-all border ${
                        isSelected 
                          ? 'bg-blue-50/70 border-[#0866C9]/40 shadow-sm' 
                          : 'bg-white hover:bg-slate-50/80 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-xs text-[#062653] truncate">
                          {at.cliente.nome}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {ultimaMsg?.horario || 'Agora'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#0866C9]/10 text-[#0866C9] truncate">
                          {at.categoria.split('(')[0]}
                        </span>
                        {at.prioridade === 'alta' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                            URGENTE
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {ultimaMsg?.tipo === 'apresentacao_card' 
                          ? `[Card com Foto enviado] ${ultimaMsg.texto}` 
                          : ultimaMsg?.texto || at.detalhes}
                      </p>
                    </div>
                  );
                })
              )
            ) : (
              // ABA HISTÓRICO
              atendimentosHistorico.length === 0 ? (
                <div className="text-center py-10 px-4 text-xs text-slate-400">
                  Nenhum atendimento arquivado encontrado.
                </div>
              ) : (
                atendimentosHistorico.map(at => (
                  <div
                    key={at.id}
                    onClick={() => setAtendimentoSelecionadoId(at.id)}
                    className="p-3 rounded-xl cursor-pointer hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>{at.cliente.nome}</span>
                      <span className="text-[10px] text-slate-400">{at.protocolo}</span>
                    </div>
                    <p className="text-[11px] text-[#0866C9] mt-0.5">{at.categoria}</p>
                    <span className="inline-block mt-1 text-[9px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Encerrado
                    </span>
                  </div>
                ))
              )
            )}

          </div>

          {/* Rodapé da Coluna com Info da Especialidade */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
            <span className="font-semibold text-[#062653]">Setores sob sua tutela:</span>
            <ul className="mt-1 list-disc list-inside space-y-0.5 text-[10px] text-slate-600">
              {atendenteAtual.modalidades.map((m, idx) => (
                <li key={idx} className="truncate">{m.split('(')[0]}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= COLUNA 2: O CHAT EXECUTIVO (IDENTIDADE MESSA) ================= */}
        <div className="flex-grow bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col overflow-hidden">
          
          {atendimentoAtivo ? (
            <>
              {/* Topo do Chat Ativo */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0866C9]/10 text-[#0866C9] flex items-center justify-center font-bold text-sm">
                    {atendimentoAtivo.cliente.nome.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#062653]">{atendimentoAtivo.cliente.nome}</h3>
                      <span className="text-[11px] text-slate-400 font-normal">({atendimentoAtivo.cliente.telefone})</span>
                    </div>
                    <p className="text-xs text-[#0866C9] font-medium flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>{atendimentoAtivo.categoria}</span>
                    </p>
                  </div>
                </div>

                {/* Botões de Ação Rápida */}
                <div className="flex items-center gap-2">
                  
                  {/* Botão de Transferir para outra atendente */}
                  <button
                    onClick={() => {
                      setAtendenteDestinoId('');
                      setModalTransferirOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-[#062653] transition-all"
                    title="Transferir atendimento para outra colega"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-[#0866C9]" />
                    <span className="hidden sm:inline">Transferir</span>
                  </button>

                  {/* Botão de Finalizar -> Limpa a mesa */}
                  <button
                    onClick={handleFinalizarAtendimento}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all border border-emerald-200"
                    title="Concluir e arquivar atendimento"
                  >
                    <Archive className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Concluir</span>
                  </button>
                </div>
              </div>

              {/* Área de Mensagens (Linha do tempo contínua e humanizada) */}
              <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F8FAFC]">
                
                {/* Protocolo e início */}
                <div className="text-center my-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-200/70 text-slate-600 text-[10px] font-semibold">
                    Atendimento Oficial • Protocolo {atendimentoAtivo.protocolo}
                  </span>
                </div>

                {atendimentoAtivo.mensagens.map(msg => {
                  
                  // 1. FAIXA SLIM EXECUTIVA DE TRANSFERÊNCIA DE RESPONSABILIDADE (Altura Reduzida em >50% e Sem Redundâncias)
                  if (msg.tipo === 'transferencia_passagem' || (msg.tipo === 'evento' && msg.texto?.includes('transferida de'))) {
                    let de = msg.deAtendente;
                    let para = msg.paraAtendente;

                    if (!de || !para) {
                      // Parser retrocompatível para transferências antigas do histórico
                      const match = msg.texto?.match(/transferida de (.+?) para (.+?)\./i);
                      if (match) {
                        const nomeDe = match[1].trim();
                        const nomePara = match[2].trim();
                        de = ATENDENTES.find(a => a.nome.toLowerCase() === nomeDe.toLowerCase()) || { nome: nomeDe, cargo: 'Consultora', avatar: '/avatars/bia_oficial.jpg' };
                        para = ATENDENTES.find(a => a.nome.toLowerCase() === nomePara.toLowerCase()) || { nome: nomePara, cargo: 'Especialista', avatar: '/avatars/amanda_oficial.jpg' };
                      } else {
                        de = { nome: 'Atendente Anterior', cargo: 'Consultora', avatar: '/avatars/bia_oficial.jpg' };
                        para = { nome: 'Nova Atendente', cargo: 'Especialista', avatar: '/avatars/amanda_oficial.jpg' };
                      }
                    }

                    return (
                      <div key={msg.id} className="my-3 mx-auto max-w-xl w-full animate-fadeIn">
                        <div className="relative rounded-2xl bg-gradient-to-r from-[#062653] via-[#083b7e] to-[#0866C9] text-white p-3 sm:px-4 sm:py-3 shadow-md border border-[#08A9E6]/30 overflow-hidden">
                          
                          {/* Topo da Faixa: Notificação de Posse com Horário */}
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-cyan-200">
                                A BOLA AGORA ESTÁ COM <strong className="text-white font-extrabold">{para.nome.toUpperCase()}</strong>
                              </span>
                            </div>
                            <span className="text-[10px] text-blue-200 font-mono flex items-center gap-1 shrink-0">
                              <Clock className="w-3 h-3 text-[#08A9E6]" />
                              {msg.horario}
                            </span>
                          </div>

                          {/* Corpo: De ──➔ Para (Proporcional, Confortável e 100% Dentro da Borda) */}
                          <div className="flex items-center justify-between gap-2 sm:gap-4">
                            
                            {/* De: Quem passou */}
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <div className="relative shrink-0">
                                <img
                                  src={de.avatar}
                                  alt={de.nome}
                                  className="w-10 h-10 rounded-full object-cover border border-white/50 grayscale-[20%]"
                                />
                                <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-slate-800 text-slate-300 text-[7px] font-bold border border-white/20">
                                  Passou
                                </span>
                              </div>
                              <div className="min-w-0 text-left">
                                <span className="text-xs sm:text-[13px] font-bold text-slate-100 block leading-tight truncate">{de.nome}</span>
                                <span className="text-[10px] sm:text-[10.5px] text-blue-200 block leading-tight truncate mt-0.5">{de.cargo}</span>
                              </div>
                            </div>

                            {/* Seta Central de Passagem */}
                            <div className="flex items-center gap-1 text-[#08A9E6] shrink-0 px-1">
                              <span className="h-[1px] w-3 sm:w-5 bg-[#08A9E6]/60"></span>
                              <div className="w-5 h-5 rounded-full bg-[#08A9E6]/25 border border-[#08A9E6]/60 flex items-center justify-center text-cyan-300">
                                <ArrowRightLeft className="w-2.5 h-2.5" />
                              </div>
                              <span className="h-[1px] w-3 sm:w-5 bg-[#08A9E6]/60"></span>
                            </div>

                            {/* Para: Novo Titular */}
                            <div className="flex items-center gap-2.5 min-w-0 flex-1 justify-end text-right">
                              <div className="min-w-0 text-right">
                                <div className="flex items-center gap-1 justify-end">
                                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[7.5px] font-black uppercase shrink-0">
                                    Titular
                                  </span>
                                  <span className="text-xs sm:text-[13px] font-black text-white block leading-tight truncate">{para.nome}</span>
                                </div>
                                <span className="text-[10px] sm:text-[10.5px] text-emerald-300 font-semibold block leading-tight truncate mt-0.5">{para.cargo}</span>
                              </div>
                              <div className="relative shrink-0">
                                <img
                                  src={para.avatar}
                                  alt={para.nome}
                                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400 shadow-md ring-2 ring-emerald-500/30"
                                />
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    );
                  }

                  // 2. Mensagem de Sistema / Outros Eventos
                  if (msg.tipo === 'evento') {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-[#0866C9] text-[11px] font-medium border border-blue-100">
                          ℹ️ {msg.texto} ({msg.horario})
                        </span>
                      </div>
                    );
                  }

                  // 3. Nota Interna Sigilosa (Amarela)
                  if (msg.remetente === 'nota_interna') {
                    return (
                      <div key={msg.id} className="bg-amber-50 border-l-4 border-amber-400 p-2.5 rounded-r-xl max-w-md mx-auto shadow-sm">
                        <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-amber-800 uppercase tracking-wider mb-0.5">
                          <AlertCircle className="w-3 h-3" />
                          <span>Nota Interna da Equipe (O cliente não vê)</span>
                          <span className="text-amber-600 font-normal ml-auto">{msg.horario}</span>
                        </div>
                        <p className="text-xs text-amber-900 leading-relaxed font-sans">{msg.texto}</p>
                        <p className="text-[9.5px] text-amber-700 mt-0.5 italic">— Anotado por {msg.atendenteNome}</p>
                      </div>
                    );
                  }

                  // 4. CARD COM FOTO / AVATAR DA ATENDENTE (Reduzido em 40%, Enxuto e Sem Repetições)
                  if (msg.tipo === 'apresentacao_card') {
                    const atCard = ATENDENTES.find(a => a.id === msg.atendenteId || a.nome?.toLowerCase() === msg.nome?.toLowerCase());
                    const fotoAvatar = atCard?.avatar || msg.avatar;
                    const nomeAtendente = atCard?.nome || msg.nome;
                    const cargoAtendente = atCard?.cargo || msg.cargo;

                    return (
                      <div key={msg.id} className="flex justify-end animate-fadeIn">
                        <div className="max-w-[420px] bg-white border border-[#0866C9]/20 rounded-2xl p-3 sm:p-3.5 shadow-md space-y-2.5">
                          
                          {/* Selo se for assunção de transferência */}
                          {msg.isTransferencia && (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9.5px] font-bold border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Nova Responsável pelo Atendimento
                            </div>
                          )}

                          {/* Crachá Superior Compacto (Avatar 44px) */}
                          <div className="flex items-center gap-2.5 bg-gradient-to-r from-blue-50/80 to-slate-50 p-2 sm:p-2.5 rounded-xl border border-blue-100/70">
                            <img 
                              src={fotoAvatar} 
                              alt={nomeAtendente} 
                              className="w-11 h-11 rounded-full object-cover border border-white shadow-sm ring-1 ring-[#0866C9]/20 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-xs sm:text-[13px] text-[#062653] leading-tight truncate">{nomeAtendente}</p>
                              <p className="text-[11px] text-[#0866C9] font-semibold leading-tight mt-0.5 truncate">{cargoAtendente}</p>
                              <p className="text-[9.5px] text-slate-400 font-medium leading-tight mt-0.5">Messa Corretora • Bebedouro/SP</p>
                            </div>
                          </div>
                          
                          {/* Texto Direto e Acolhedor sem Redundâncias */}
                          <p className="text-xs text-slate-700 leading-relaxed font-normal">
                            {msg.texto}
                          </p>

                          <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-0.5">
                            <span>{msg.horario}</span>
                            <CheckCheck className="w-3 h-3 text-[#0866C9]" />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Mensagem normal da Atendente
                  if (msg.remetente === 'atendente') {
                    return (
                      <div key={msg.id} className="flex justify-end">
                        <div className="max-w-md bg-[#0866C9] text-white rounded-2xl rounded-tr-none px-4 py-2.5 shadow-sm space-y-1">
                          <p className="text-xs leading-relaxed whitespace-pre-line">{msg.texto}</p>
                          <div className="flex items-center justify-end gap-1 text-[9px] text-blue-100">
                            <span>{msg.horario}</span>
                            <CheckCheck className="w-3 h-3 text-cyan-200" />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Mensagem vinda do Cliente (WhatsApp)
                  return (
                    <div key={msg.id} className="flex justify-start">
                      <div className="max-w-md bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm space-y-1">
                        <span className="text-[10px] font-bold text-[#062653] block">{atendimentoAtivo.cliente.nome}</span>
                        <p className="text-xs leading-relaxed">{msg.texto}</p>
                        <span className="text-[9px] text-slate-400 block text-right">{msg.horario}</span>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Barra de Envio de Mensagens */}
              <div className="p-3.5 border-t border-slate-200 bg-white">
                
                {/* Botão de demonstração útil para o teste ao vivo */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] text-slate-600">
                      A bola agora está com: <strong className="text-[#062653] font-extrabold">{atendenteTitular.nome}</strong>
                      <span className="ml-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                        Titular Atual
                      </span>
                    </span>
                  </div>
                  
                  {/* Simular resposta do cliente na demonstração */}
                  <button
                    type="button"
                    onClick={handleSimularRespostaCliente}
                    className="text-[10px] text-[#0866C9] hover:underline font-medium"
                    title="Gera uma resposta do cliente para enriquecer a apresentação"
                  >
                    + Simular Resposta do Cliente
                  </button>
                </div>

                <form onSubmit={handleEnviarMensagem} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Digite sua mensagem para ${atendimentoAtivo.cliente.nome}...`}
                    value={textoMensagem}
                    onChange={(e) => setTextoMensagem(e.target.value)}
                    className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0866C9] text-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            // Nenhuma conversa selecionada
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0866C9] flex items-center justify-center mb-4 shadow-sm">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-sm text-[#062653]">Nenhum Atendimento Selecionado</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Selecione uma conversa na coluna esquerda ou envie um novo formulário através do site da corretora para testar o direcionamento automático.
              </p>
            </div>
          )}

        </div>

        {/* ================= COLUNA 3: A FICHA DO SEGURADO (CONTEXTO RÁPIDO) ================= */}
        {atendimentoAtivo && (
          <div className="w-full md:w-72 lg:w-80 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 flex flex-col space-y-4">
            
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-[#0866C9]" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#062653]">Ficha do Segurado</h4>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">NOME</span>
                <p className="font-medium text-[#062653]">{atendimentoAtivo.cliente.nome}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">WHATSAPP</span>
                <p className="font-medium text-[#062653] flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>{atendimentoAtivo.cliente.telefone}</span>
                </p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">E-MAIL</span>
                <p className="font-medium text-[#062653] truncate">{atendimentoAtivo.cliente.email}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">PRODUTO SOLICITADO</span>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-blue-50 text-[#0866C9] font-medium text-[11px] border border-blue-100">
                  {atendimentoAtivo.categoria}
                </span>
              </div>
            </div>

            {/* Detalhes preenchidos no formulário do site */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs">
              <span className="text-[10px] text-slate-400 font-semibold block mb-1">MENSAGEM / BEM COTADO</span>
              <p className="text-slate-600 text-[11px] leading-relaxed italic">
                "{atendimentoAtivo.detalhes}"
              </p>
            </div>

            {/* Atendente Responsável Atual */}
            <div className="mt-auto pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-bold block mb-2 tracking-wider">RESPONSÁVEL PELO ATENDIMENTO</span>
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50/60 to-slate-50 p-3 rounded-2xl border border-blue-100/80 shadow-2xs">
                <img 
                  src={atendenteTitular.avatar} 
                  alt={atendenteTitular.nome} 
                  className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-emerald-500/30 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-extrabold text-[#062653]">{atendenteTitular.nome}</p>
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[8.5px] font-black uppercase tracking-wide">
                      A BOLA É DELA
                    </span>
                  </div>
                  <p className="text-xs text-[#0866C9] font-semibold">{atendenteTitular.cargo}</p>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">Messa Corretora</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ================= MODAL: TRANSFERÊNCIA ENTRE ATENDENTES ================= */}
      {modalTransferirOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-[#0866C9]" />
                <h3 className="font-bold text-sm text-[#062653]">Transferir Atendimento</h3>
              </div>
              <button 
                onClick={() => setModalTransferirOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062653] mb-1.5">
                Selecione a Atendente de Destino:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {ATENDENTES.filter(a => a.id !== atendenteAtualId).map(at => (
                  <div
                    key={at.id}
                    onClick={() => setAtendenteDestinoId(at.id)}
                    className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      atendenteDestinoId === at.id 
                        ? 'border-[#0866C9] bg-blue-50/70 shadow-sm' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <img 
                      src={at.avatar} 
                      alt={at.nome} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#062653]">{at.nome}</p>
                      <p className="text-[10px] text-slate-500">{at.cargo}</p>
                      <p className="text-[9px] text-[#0866C9] mt-0.5">{at.modalidades.join(' • ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062653] mb-1.5">
                Nota Interna Sigilosa (Só a equipe vê):
              </label>
              <textarea
                rows="2"
                placeholder="Ex: Cliente quer desconto ou análise especial de franquia..."
                value={notaInternaTexto}
                onChange={(e) => setNotaInternaTexto(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0866C9] resize-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalTransferirOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!atendenteDestinoId}
                onClick={handleConfirmarTransferencia}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0866C9] hover:bg-[#062653] text-white disabled:opacity-50 transition-all shadow-sm"
              >
                Confirmar Transferência
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL: LEITURA DO QR CODE DO WHATSAPP ================= */}
      {modalQrCodeOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 border border-slate-100">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <h3 className="font-bold text-sm text-[#062653]">Conectar WhatsApp</h3>
              </div>
              <button 
                onClick={() => setModalQrCodeOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Abra o WhatsApp no seu celular, vá em <strong>Aparelhos Conectados</strong> e aponte a câmera para o QR Code abaixo:
            </p>

            {/* Imagem do QR Code Gerada pelo Gateway */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block mx-auto shadow-inner">
              {gatewayStatus.qrCode ? (
                <img 
                  src={gatewayStatus.qrCode} 
                  alt="QR Code WhatsApp" 
                  className="w-56 h-56 mx-auto rounded-lg"
                />
              ) : gatewayStatus.status === 'CONNECTED' ? (
                <div className="py-12 text-center text-emerald-600 space-y-2">
                  <CheckCheck className="w-12 h-12 mx-auto" />
                  <p className="text-xs font-bold">WhatsApp já está Conectado!</p>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <div className="w-8 h-8 border-2 border-[#0866C9] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs">Gerando QR Code...</p>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400">
              {gatewayStatus.status === 'CONNECTED' ? '🟢 Conectado com Sucesso' : '🟡 Aguardando leitura no celular...'}
            </p>

            <button
              type="button"
              onClick={() => setModalQrCodeOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#062653] font-semibold text-xs transition-colors"
            >
              Fechar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
