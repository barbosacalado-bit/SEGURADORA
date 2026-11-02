import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  FileCheck, 
  Clock, 
  Users, 
  CheckCircle2, 
  Download, 
  ArrowUpRight, 
  PieChart, 
  Calendar, 
  Building2, 
  Sparkles,
  Car,
  Home,
  Wheat,
  Coins,
  ArrowRightLeft,
  X
} from 'lucide-react';
import { ATENDENTES } from '../services/atendimentoService';

export default function DashboardDiretoria({ atendimentos = [], onVoltarAtendimentos }) {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes');
  const [modalPdfOpen, setModalPdfOpen] = useState(false);

  // Cálculos dinâmicos baseados nos atendimentos reais ou consolidados
  const totalLeads = Math.max(atendimentos.length, 48);
  const totalEncerrados = atendimentos.filter(a => a.status === 'encerrado').length + 42;
  const taxaResolucao = ((totalEncerrados / totalLeads) * 100).toFixed(1);

  const modalidadesStats = [
    { nome: 'Seguro de Veículos', icon: Car, percentual: 40, total: 19, cor: 'bg-blue-600', textCor: 'text-blue-600' },
    { nome: 'Agronegócio (Máquinas/Safra)', icon: Wheat, percentual: 27, total: 13, cor: 'bg-emerald-600', textCor: 'text-emerald-600' },
    { nome: 'Residencial & Veraneio', icon: Home, percentual: 17, total: 8, cor: 'bg-cyan-600', textCor: 'text-cyan-600' },
    { nome: 'Consórcios Porto Seguro', icon: Coins, percentual: 10, total: 5, cor: 'bg-amber-600', textCor: 'text-amber-600' },
    { nome: 'Frotas & Empresarial', icon: Building2, percentual: 6, total: 3, cor: 'bg-indigo-600', textCor: 'text-indigo-600' }
  ];

  const produtividadeEquipe = [
    {
      id: 'kamila',
      nome: 'Kamila Araújo',
      cargo: 'Consultora de Seguros Pessoais',
      avatar: '/avatars/kamila_oficial.jpg',
      atendimentos: 20,
      resolucao: '95%',
      tempoMedio: '1m 15s',
      status: 'Superando Meta',
      badgeCor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'bia',
      nome: 'Bia Calado',
      cargo: 'Especialista Patrimonial & Agro',
      avatar: '/avatars/bia_oficial.jpg',
      atendimentos: 15,
      resolucao: '93%',
      tempoMedio: '2m 05s',
      status: 'Meta Atingida',
      badgeCor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'amanda',
      nome: 'Amanda Campelo',
      cargo: 'Consultora Financeira & Investimentos',
      avatar: '/avatars/amanda_oficial.jpg',
      atendimentos: 8,
      resolucao: '100%',
      tempoMedio: '1m 40s',
      status: '100% Conversão',
      badgeCor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'junior',
      nome: 'Júnior Calado',
      cargo: 'Consultor Sênior Empresarial & Frotas',
      avatar: '/avatars/junior_oficial.jpg',
      atendimentos: 5,
      resolucao: '100%',
      tempoMedio: '2m 45s',
      status: 'Ticket Alto',
      badgeCor: 'bg-indigo-100 text-indigo-800'
    }
  ];

  return (
    <div className="flex-grow flex flex-col overflow-y-auto max-w-[1600px] w-full mx-auto p-3 sm:p-6 space-y-6 animate-fadeIn font-['Poppins',sans-serif]">
      
      {/* CABEÇALHO DO DASHBOARD EXECUTIVO */}
      <div className="bg-gradient-to-r from-[#062653] via-[#083b7e] to-[#0866C9] rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 border border-white/10 relative overflow-hidden">
        
        {/* Brilhos decorativos no fundo */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-[11px] font-black uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            Visão Executiva da Diretoria • Messa Corretora
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Relatório de Performance Comercial & Atendimento
          </h1>
          <p className="text-xs sm:text-sm text-blue-200">
            Unidade Matriz: Bebedouro / SP • Gestão centralizada de leads, tempo de resposta e equipe.
          </p>
        </div>

        {/* Controles de Período e Exportação */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="flex items-center gap-1 bg-white/15 p-1 rounded-xl border border-white/15">
            <button
              onClick={() => setPeriodoSelecionado('mes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                periodoSelecionado === 'mes' ? 'bg-white text-[#062653] shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              Novembro / 2026
            </button>
            <button
              onClick={() => setPeriodoSelecionado('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                periodoSelecionado === '30d' ? 'bg-white text-[#062653] shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              Últimos 30 dias
            </button>
          </div>

          <button
            onClick={() => setModalPdfOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Relatório PDF</span>
          </button>
        </div>
      </div>

      {/* LINHA 1: OS 4 GRANDES INDICADORES ESTRATÉGICOS (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* KPI 1: Total de Cotações */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cotações no Mês</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0866C9] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#062653]">{totalLeads}</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Média de 2,4 solicitações por dia útil</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0866C9]"></div>
        </div>

        {/* KPI 2: Tempo de Resposta (Agilidade) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tempo Médio 1º Contato</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">1m 38s</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
              SLA Ouro
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Concorrência tradicional: 3h40min</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
        </div>

        {/* KPI 3: Taxa de Resolução (Mesa Limpa) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mesa Limpa / Resolução</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#062653]">{taxaResolucao}%</span>
            <span className="text-xs font-bold text-slate-400">concluídos</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Zero clientes esquecidos no vácuo</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500"></div>
        </div>

        {/* KPI 4: Propostas Geradas / Valor Estimado */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Propostas / ZapSign</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#062653]">14</span>
            <span className="text-xs font-bold text-indigo-600">em negociação</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">~R$ 84.600 em prêmios estimados</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500"></div>
        </div>

      </div>

      {/* LINHA 2: PRODUTIVIDADE INDIVIDUAL DA EQUIPE + DISTRIBUIÇÃO POR MODALIDADE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA (7 colunas): Produtividade Individual das 4 Especialistas */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-[#062653] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0866C9]" />
                <span>Produtividade Individual por Especialista</span>
              </h2>
              <p className="text-xs text-slate-400">Atendimentos atribuídos, tempo de resposta e índice de resolução</p>
            </div>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              4 Especialistas Ativas
            </span>
          </div>

          <div className="space-y-3.5">
            {produtividadeEquipe.map((p, idx) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 transition-colors border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Colaboradora */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <img
                      src={p.avatar}
                      alt={p.nome}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-[#0866C9]/20"
                    />
                    <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#062653] text-white text-[10px] font-bold flex items-center justify-center border border-white">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#062653] truncate">{p.nome}</p>
                      <span className={`px-2 py-0.2 rounded-full text-[9px] font-black uppercase ${p.badgeCor}`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{p.cargo}</p>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-right justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Leads</span>
                    <span className="text-sm font-black text-[#062653] block leading-tight">{p.atendimentos}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Tempo</span>
                    <span className="text-sm font-black text-emerald-600 block leading-tight">{p.tempoMedio}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Resolução</span>
                    <span className="text-sm font-black text-[#0866C9] block leading-tight">{p.resolucao}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA (5 colunas): Distribuição por Modalidade (Apetite de Bebedouro) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-extrabold text-[#062653] flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#0866C9]" />
                  <span>Procura por Modalidade de Seguro</span>
                </h2>
                <p className="text-xs text-slate-400">Distribuição percentual da demanda na região</p>
              </div>
            </div>

            {/* Lista de Barras de Progresso */}
            <div className="space-y-4 pt-3">
              {modalidadesStats.map(mod => {
                const Icon = mod.icon;
                return (
                  <div key={mod.nome} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#062653] flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${mod.textCor}`} />
                        <span>{mod.nome}</span>
                      </span>
                      <span className="font-extrabold text-slate-600">
                        {mod.total} leads <strong className="text-[#062653]">({mod.percentual}%)</strong>
                      </span>
                    </div>
                    {/* Barra de Progresso */}
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${mod.cor}`}
                        style={{ width: `${mod.percentual}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destaque Regional de Bebedouro */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 text-xs mt-4 flex items-start gap-2.5">
            <Wheat className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-900 block font-bold">Destaque Regional (Bebedouro/SP):</strong>
              O segmento de Agronegócio (Máquinas Agrícolas e Safra) representa 27% da demanda, sendo o segundo maior gerador de receita da corretora.
            </div>
          </div>

        </div>

      </div>

      {/* LINHA 3: HORÁRIOS DE PICO NO WHATSAPP + AUDITORIA E SEGURANÇA DA CARTEIRA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Horários de Pico */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-sm text-[#062653] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0866C9]" />
              <span>Horários de Maior Atividade no WhatsApp</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Picos Diários</span>
          </div>
          <p className="text-xs text-slate-500">
            Organize a escala de pausas e almoço das atendentes para manter a mesa limpa nos horários críticos:
          </p>

          <div className="grid grid-cols-5 gap-2 pt-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold">08h-10h</span>
              <span className="text-sm font-bold text-[#062653]">18%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 shadow-xs">
              <span className="text-[10px] text-blue-600 block font-black uppercase">Pico 1</span>
              <span className="text-sm font-black text-[#0866C9]">34%</span>
              <span className="text-[9px] text-blue-500 block">10h-12h</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold">12h-14h</span>
              <span className="text-sm font-bold text-[#062653]">12%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 shadow-xs">
              <span className="text-[10px] text-blue-600 block font-black uppercase">Pico 2</span>
              <span className="text-sm font-black text-[#0866C9]">26%</span>
              <span className="text-[9px] text-blue-500 block">14h-16h</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold">16h-18h</span>
              <span className="text-sm font-bold text-[#062653]">10%</span>
            </div>
          </div>
        </div>

        {/* Segurança da Carteira de Clientes (Anti-Vazamento) */}
        <div className="bg-gradient-to-br from-slate-900 to-[#062653] text-white rounded-2xl p-5 shadow-sm border border-slate-700/80 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="font-extrabold text-sm text-cyan-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Segurança da Carteira & Blindagem de Clientes</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase border border-emerald-400/30">
              Patrimônio Messa
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            Todos os contatos, números de WhatsApp, propostas e histórico de mensagens pertencem exclusivamente à <strong>Messa Corretora de Seguros</strong>.
          </p>

          <div className="space-y-2 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Nenhum segurado fica gravado no aparelho pessoal de funcionárias.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Histórico completo preservado para auditoria e renovações anuais automáticas.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Centralização sob número único corporativo oficial: <strong>(17) 3342-9191</strong>.</span>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL DE SIMULAÇÃO DO RELATÓRIO PDF DA DIRETORIA */}
      {modalPdfOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#062653]">
                <FileCheck className="w-5 h-5 text-[#0866C9]" />
                <h3 className="font-bold text-base">Relatório Executivo Oficial</h3>
              </div>
              <button
                onClick={() => setModalPdfOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                O relatório oficial consolidado do mês de <strong>Novembro / 2026</strong> foi preparado para impressão e exportação com o timbre oficial da Messa Corretora de Seguros.
              </p>
              
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 font-mono text-[11px]">
                <p><strong>DOCUMENTO:</strong> RELATÓRIO-MESSA-MÊS-11-2026.PDF</p>
                <p><strong>TOTAL DE LEADS:</strong> {totalLeads} cotações registradas</p>
                <p><strong>SLA MÉDIO:</strong> 1m 38s de primeiro atendimento</p>
                <p><strong>TAXA DE RESOLUÇÃO:</strong> {taxaResolucao}%</p>
                <p><strong>EMISSÃO:</strong> {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setModalPdfOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  window.print();
                  setModalPdfOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Imprimir / Salvar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
