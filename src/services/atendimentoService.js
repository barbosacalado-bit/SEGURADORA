// Definição da Equipe Oficial de Atendimento e Distribuição de Modalidades

export const ATENDENTES = [
  {
    id: 'kamila',
    nome: 'Kamila Araújo',
    cargo: 'Consultora de Seguros Pessoais',
    idade: '30 anos',
    avatar: '/avatars/kamila.jpg',
    online: true,
    corBadge: 'bg-blue-100 text-[#0866C9] border-blue-200',
    modalidades: [
      'Seguro de Veículos (Auto, Sênior, Jovem, Táxi)',
      'Seguro de Vida e Família'
    ],
    apresentacaoTexto: 'Olá! Sou a Kamila Araújo, consultora especialista em Seguros de Veículos e Vida aqui na Messa Corretora. Recebi sua solicitação direto do nosso site e já estou separando as melhores opções para o seu perfil. Como posso te ajudar hoje?'
  },
  {
    id: 'bia',
    nome: 'Bia Calado',
    cargo: 'Especialista Patrimonial & Agro',
    idade: '21 anos',
    avatar: '/avatars/bia.jpg',
    online: true,
    corBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    modalidades: [
      'Seguro Residencial ou Veraneio',
      'Agronegócio (Máquinas / Safra)'
    ],
    apresentacaoTexto: 'Olá! Sou a Bia Calado, especialista em Seguro Residencial e Agronegócio na Messa Corretora. Vi sua mensagem através do nosso site e já estou à sua disposição. Como posso te ajudar hoje?'
  },
  {
    id: 'amanda',
    nome: 'Amanda Campelo',
    cargo: 'Consultora Financeira & Investimentos',
    idade: '30 anos',
    avatar: '/avatars/amanda.jpg',
    online: true,
    corBadge: 'bg-amber-100 text-amber-800 border-amber-200',
    modalidades: [
      'Consórcio Imobiliário Porto Seguro',
      'Previdência Privada'
    ],
    apresentacaoTexto: 'Olá! Sou a Amanda Campelo, responsável pelo setor de Consórcios e Previdência Privada da Messa Corretora. Recebi sua solicitação do portal e estou pronta para te apresentar as melhores condições. Como posso te auxiliar?'
  },
  {
    id: 'junior',
    nome: 'Júnior Calado',
    cargo: 'Consultor Sênior Empresarial & Frotas',
    idade: '57 anos',
    avatar: '/avatars/junior.jpg',
    online: true,
    corBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    modalidades: [
      'Seguro Empresarial / Frotas',
      'Outras modalidades'
    ],
    apresentacaoTexto: 'Olá! Sou o Júnior Calado, consultor sênior na Messa Corretora especializado em Seguros Empresariais, Frotas e Soluções Customizadas. Recebi sua solicitação e já estou analisando seu caso. Em que posso te ajudar?'
  }
];

// Função que descobre para qual atendente o lead deve ir com base na modalidade escolhida
export function obterAtendentePorModalidade(categoria) {
  if (!categoria) return ATENDENTES[0]; // Kamila como padrão
  
  const encontrada = ATENDENTES.find(at => 
    at.modalidades.some(m => m.toLowerCase().trim() === categoria.toLowerCase().trim())
  );
  
  return encontrada || ATENDENTES[0];
}

// Chave do localStorage para sincronizar mensagens entre abas (Chrome, Firefox, etc.)
const STORAGE_KEY = 'messa_atendimentos_db_v1';

// Carrega os atendimentos do localStorage
export function carregarAtendimentos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Dados iniciais de demonstração elegantes
      const iniciais = [
        {
          id: 'lead-1',
          protocolo: 'MS-2026-081',
          cliente: {
            nome: 'Dr. Roberto Messa',
            telefone: '(17) 99781-2200',
            email: 'roberto.messa@exemplo.com'
          },
          categoria: 'Seguro de Veículos (Auto, Sênior, Jovem, Táxi)',
          detalhes: 'Veículo Toyota Corolla Cross 2024, uso pessoal e viagens de trabalho.',
          status: 'em_atendimento', // 'aguardando' | 'em_atendimento' | 'encerrado'
          atendenteId: 'kamila',
          prioridade: 'normal',
          dataCriacao: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
          mensagens: [
            {
              id: 'm-1',
              remetente: 'sistema',
              tipo: 'evento',
              texto: 'Lead capturado através do formulário de cotação do site.',
              horario: '17:40'
            },
            {
              id: 'm-2',
              remetente: 'atendente',
              atendenteId: 'kamila',
              tipo: 'apresentacao_card',
              avatar: '/avatars/kamila.jpg',
              nome: 'Kamila Araújo',
              cargo: 'Consultora de Seguros Pessoais',
              texto: 'Olá! Sou a Kamila Araújo, consultora especialista em Seguros de Veículos e Vida aqui na Messa Corretora. Recebi sua solicitação direto do nosso site e já estou separando as melhores opções para o seu perfil. Como posso te ajudar hoje?',
              horario: '17:41'
            },
            {
              id: 'm-3',
              remetente: 'cliente',
              texto: 'Boa tarde Kamila! Gostaria de uma cotação com cobertura compreensiva e guincho sem limite de KM pela Porto Seguro.',
              horario: '17:43'
            }
          ]
        },
        {
          id: 'lead-2',
          protocolo: 'MS-2026-082',
          cliente: {
            nome: 'Marcos Fazenda Nova',
            telefone: '(17) 99654-1122',
            email: 'marcos@fazendanova.com.br'
          },
          categoria: 'Agronegócio (Máquinas / Safra)',
          detalhes: 'Colheitadeira John Deere S770 ano 2023, Bebedouro/SP.',
          status: 'aguardando',
          atendenteId: 'bia',
          prioridade: 'alta',
          dataCriacao: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
          mensagens: [
            {
              id: 'm-201',
              remetente: 'sistema',
              tipo: 'evento',
              texto: 'Lead capturado através do formulário de cotação do site.',
              horario: '17:58'
            }
          ]
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(iniciais));
      return iniciais;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler atendimentos:', err);
    return [];
  }
}

// Salva e notifica outras abas (Window Storage Event)
export function salvarAtendimentos(atendimentos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atendimentos));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Erro ao salvar atendimentos:', err);
  }
}

// Adiciona um novo lead originado pelo formulário do site
export function criarNovoLeadFormulario({ nome, telefone, email, categoria, mensagem }) {
  const atendenteResponsavel = obterAtendentePorModalidade(categoria);
  const atendimentos = carregarAtendimentos();
  const agora = new Date();
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const novoAtendimento = {
    id: 'lead-' + Date.now(),
    protocolo: `MS-2026-${Math.floor(100 + Math.random() * 900)}`,
    cliente: {
      nome,
      telefone,
      email
    },
    categoria,
    detalhes: mensagem || 'Solicitação iniciada pelo portal web da corretora.',
    status: 'em_atendimento', // Já abre direto atribuído à especialista
    atendenteId: atendenteResponsavel.id,
    prioridade: categoria.toLowerCase().includes('veículos') || categoria.toLowerCase().includes('agro') ? 'alta' : 'normal',
    dataCriacao: agora.toISOString(),
    mensagens: [
      {
        id: 'msg-' + Date.now() + '-1',
        remetente: 'sistema',
        tipo: 'evento',
        texto: `Lead recebido pelo formulário web [${categoria}] e direcionado para ${atendenteResponsavel.nome}.`,
        horario: horaFormatada
      },
      {
        id: 'msg-' + Date.now() + '-2',
        remetente: 'atendente',
        atendenteId: atendenteResponsavel.id,
        tipo: 'apresentacao_card',
        avatar: atendenteResponsavel.avatar,
        nome: atendenteResponsavel.nome,
        cargo: atendenteResponsavel.cargo,
        texto: atendenteResponsavel.apresentacaoTexto,
        horario: horaFormatada
      }
    ]
  };

  const listaAtualizada = [novoAtendimento, ...atendimentos];
  salvarAtendimentos(listaAtualizada);
  return novoAtendimento;
}
