import React, { useState } from 'react';
import { Send, ChevronDown, CheckCircle, HelpCircle, PhoneCall, ArrowRight, MessageSquare } from 'lucide-react';
import { criarNovoLeadFormulario, obterAtendentePorModalidade } from '../services/atendimentoService';

export default function FormularioFAQ({ produtoSelecionado, onAbrirCentral }) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    categoria: produtoSelecionado || 'Seguro de Veículos (Auto, Sênior, Jovem, Táxi)',
    mensagem: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [leadAtribuido, setLeadAtribuido] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      pergunta: "O que devo fazer imediatamente caso ocorra um sinistro?",
      resposta: "Primeiro, garanta a segurança física de todos os envolvidos. Em seguida, acione a assistência 24h da sua seguradora para socorro ou guincho. Fotografe os danos e entre em contato conosco na Messa Corretora pelo telefone (17) 3342-9191 para orientarmos a abertura e regulação do processo sem burocracia."
    },
    {
      pergunta: "Como a Messa Corretora faz a cotação comparativa?",
      resposta: "Com os dados do seu veículo, imóvel ou perfil pessoal, realizamos uma cotação simultânea nas maiores companhias do país (Porto Seguro, Azul, Tokio Marine e outras), comparando não apenas o preço, mas franquias, guincho ilimitado e serviços agregados para você fazer a melhor escolha."
    },
    {
      pergunta: "Posso utilizar o saldo do FGTS no Consórcio de Imóvel da Porto Seguro?",
      resposta: "Sim! De acordo com as normas da Caixa e do Governo Federal, o saldo do FGTS pode ser utilizado tanto para ofertar lances e antecipar a contemplação quanto para amortizar o saldo devedor do seu imóvel residencial."
    },
    {
      pergunta: "Qual é a vantagem de renovar meu seguro através da Messa?",
      resposta: "Ao renovar com a Messa Corretora, você preserva ou amplia suas classes de bônus, recebe reavaliação de franquia e coberturas e conta com nosso acompanhamento pessoal durante toda a vigência da apólice, sem ficar dependente de robôs ou centrais telefônicas impessoais."
    },
    {
      pergunta: "Quais documentos básicos são necessários para cotar?",
      resposta: "Para Seguro Auto, precisamos do CRLV (documento do carro) e CNH do condutor principal. Para Seguro Residencial, o endereço completo e características do imóvel. Para Seguro de Vida, dados pessoais básicos. O processo é ágil e pode ser feito totalmente por WhatsApp ou e-mail."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Roteia automaticamente para a especialista correspondente com card do avatar
    const novoLead = criarNovoLeadFormulario({
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      categoria: formData.categoria,
      mensagem: formData.mensagem
    });

    const atendente = obterAtendentePorModalidade(formData.categoria);
    setLeadAtribuido(atendente);
    setEnviado(true);
  };

  const enviarWhatsAppDireto = () => {
    const texto = encodeURIComponent(
      `Olá! Meu nome é ${formData.nome}.\n` +
      `Gostaria de uma proposta para: ${formData.categoria}.\n` +
      `Telefone: ${formData.telefone}\n` +
      `E-mail: ${formData.email}\n` +
      (formData.mensagem ? `Observações: ${formData.mensagem}` : '')
    );
    window.open(`https://wa.me/551733429191?text=${texto}`, '_blank');
  };

  return (
    <section id="cotacao" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Coluna Esquerda: Formulário de Cotação Rápida */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 relative">
            <div className="space-y-3 mb-8">
              <span className="text-xs font-bold text-[#0866C9] uppercase tracking-wider block">
                Cotação Sem Compromisso
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062653] tracking-tight">
                Solicite uma proposta personalizada
              </h3>
              <p className="text-sm text-[#596273]">
                Preencha as informações abaixo e nossa equipe em Bebedouro/SP entrará em contato com a melhor opção para seu perfil.
              </p>
            </div>

            {enviado ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">Solicitação Direcionada com Sucesso!</h4>
                
                {leadAtribuido && (
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-3 text-left max-w-sm mx-auto shadow-sm">
                    <img 
                      src={leadAtribuido.avatar} 
                      alt={leadAtribuido.nome} 
                      className="w-12 h-12 rounded-full object-cover border border-emerald-300"
                    />
                    <div>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Especialista Atribuída</span>
                      <p className="text-xs font-bold text-[#062653]">{leadAtribuido.nome}</p>
                      <p className="text-[10px] text-[#0866C9]">{leadAtribuido.cargo}</p>
                    </div>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
                  Obrigado, <strong>{formData.nome}</strong>. Sua solicitação de <strong>{formData.categoria}</strong> já foi entregue diretamente na mesa de atendimento da <strong>{leadAtribuido?.nome}</strong>.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={enviarWhatsAppDireto}
                    className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Falar no WhatsApp Agora &rarr;</span>
                  </button>
                  
                  {onAbrirCentral && (
                    <button
                      type="button"
                      onClick={onAbrirCentral}
                      className="flex-1 py-3 px-4 bg-[#0866C9] hover:bg-[#062653] text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ver Painel da Atendente</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setEnviado(false)}
                  className="text-xs text-slate-500 underline block mx-auto pt-2"
                >
                  Enviar outra solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-[#062653] mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0866C9] focus:ring-2 focus:ring-[#0866C9]/20 text-sm outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#062653] mb-1.5">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(17) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0866C9] focus:ring-2 focus:ring-[#0866C9]/20 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#062653] mb-1.5">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0866C9] focus:ring-2 focus:ring-[#0866C9]/20 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#062653] mb-1.5">
                    Qual seguro você deseja cotar? *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0866C9] focus:ring-2 focus:ring-[#0866C9]/20 text-sm outline-none bg-white transition-all text-[#062653]"
                  >
                    <option value="Seguro de Veículos (Auto, Sênior, Jovem, Táxi)">Seguro de Veículos (Auto, Sênior, Jovem, Táxi)</option>
                    <option value="Seguro Residencial ou Veraneio">Seguro Residencial ou Veraneio</option>
                    <option value="Seguro de Vida e Família">Seguro de Vida e Família</option>
                    <option value="Consórcio Imobiliário Porto Seguro">Consórcio Imobiliário Porto Seguro</option>
                    <option value="Agronegócio (Máquinas / Safra)">Agronegócio (Máquinas / Safra)</option>
                    <option value="Previdência Privada">Previdência Privada</option>
                    <option value="Seguro Empresarial / Frotas">Seguro Empresarial / Frotas</option>
                    <option value="Outras modalidades">Outras modalidades</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#062653] mb-1.5">
                    Detalhes do Bem ou Mensagem (opcional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Ex: Veículo modelo 2022, uso diário, garagem fechada..."
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0866C9] focus:ring-2 focus:ring-[#0866C9]/20 text-sm outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitação de Proposta</span>
                </button>

                <p className="text-[11px] text-[#596273] text-center pt-1">
                  Seus dados estão protegidos. Não enviamos spam.
                </p>
              </form>
            )}
          </div>

          {/* Coluna Direita: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-6 text-left" id="faq">
            <div>
              <span className="text-xs font-bold text-[#0866C9] uppercase tracking-wider block">
                Tire Suas Dúvidas
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062653] tracking-tight mt-1">
                Perguntas frequentes sobre seguros e sinistros
              </h3>
              <p className="text-sm text-[#596273] mt-2">
                Reunimos as respostas para as principais dúvidas dos nossos segurados em Bebedouro e região.
              </p>
            </div>

            {/* Accordion Component (Estilo Insuren) */}
            <div className="space-y-3 pt-2">
              {faqs.map((faq, index) => {
                const isActive = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isActive ? -1 : index)}
                      className={`w-full p-5 text-left flex items-center justify-between gap-4 transition-colors ${
                        isActive
                          ? 'bg-[#062653] text-white'
                          : 'bg-white hover:bg-[#F3F6FD] text-[#062653]'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-bold leading-snug">
                        {faq.pergunta}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isActive
                            ? 'bg-[#08A9E6] text-white rotate-180'
                            : 'bg-[#F3F6FD] text-[#0866C9]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isActive && (
                      <div className="p-5 bg-[#F3F6FD] text-xs sm:text-sm text-[#596273] leading-relaxed border-t border-slate-100">
                        {faq.resposta}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ITEM 7: Box de Dúvidas / Contato Rápido com Visual Premium e Alto Destaque */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#F3F6FD] to-white border border-[#0866C9]/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0866C9] to-[#08A9E6] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#062653]">Ainda tem alguma dúvida?</h4>
                  <p className="text-xs text-[#596273]">Fale diretamente com nossos consultores em Bebedouro.</p>
                </div>
              </div>
              
              <a
                href="tel:01733429191"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0866C9] hover:bg-[#062653] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 shrink-0 transform hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4 text-[#08A9E6]" />
                <span>(17) 3342-9191</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
