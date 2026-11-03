// Serviço Oficial de Conexão com a Z-API (Nuvem Oficial)
// Instância: BIA EMPRESA

const ZAPI_CONFIG = {
  instanceId: '3FB78203631D31ADA8A566A393099C93',
  token: '552ED17BD8FDE1D5671A1CF5',
  clientToken: 'F3b7ec0f94d914c4ea6c7620c96fe4d46S',
  baseUrl: 'https://api.z-api.io/instances/3FB78203631D31ADA8A566A393099C93/token/552ED17BD8FDE1D5671A1CF5'
};

/**
 * Normaliza o telefone para o padrão exigido pela Z-API:
 * Somente números com DDI 55 (ex: 5517999998888 ou 556182714286)
 */
export const normalizarTelefoneZApi = (telefone) => {
  if (!telefone) return '';
  let limpo = telefone.replace(/\D/g, '');
  if (limpo.startsWith('0')) {
    limpo = limpo.substring(1);
  }
  if (limpo.length === 10 || limpo.length === 11) {
    limpo = '55' + limpo;
  }
  return limpo;
};

/**
 * Consulta o status em tempo real da instância Z-API
 */
export const checarStatusZApi = async () => {
  try {
    const res = await fetch(`${ZAPI_CONFIG.baseUrl}/status`, {
      method: 'GET',
      headers: {
        'Client-Token': ZAPI_CONFIG.clientToken
      }
    });

    if (!res.ok) {
      return { connected: false, error: 'Falha ao consultar Z-API' };
    }

    const data = await res.json();
    
    // Se conectado, busca os dados do aparelho
    if (data.connected) {
      try {
        const deviceRes = await fetch(`${ZAPI_CONFIG.baseUrl}/device`, {
          headers: { 'Client-Token': ZAPI_CONFIG.clientToken }
        });
        if (deviceRes.ok) {
          const deviceData = await deviceRes.json();
          return {
            connected: true,
            phone: deviceData.phone || null,
            name: deviceData.name || 'WhatsApp Corretora'
          };
        }
      } catch (e) {}

      return {
        connected: true,
        phone: null,
        name: 'WhatsApp Corretora'
      };
    }

    return {
      connected: false,
      error: data.error || 'Aparelho desconectado'
    };
  } catch (err) {
    console.error('Erro na consulta da Z-API:', err);
    return { connected: false, error: err.message };
  }
};

/**
 * Obtém a imagem do QR Code em Base64 caso o aparelho esteja desconectado
 */
export const obterQrCodeZApi = async () => {
  try {
    const res = await fetch(`${ZAPI_CONFIG.baseUrl}/qr-code/image`, {
      method: 'GET',
      headers: {
        'Client-Token': ZAPI_CONFIG.clientToken
      }
    });

    if (res.ok) {
      const data = await res.json();
      return data.value; // Retorna "data:image/png;base64,..."
    }
    return null;
  } catch (err) {
    console.error('Erro ao obter QR Code da Z-API:', err);
    return null;
  }
};

/**
 * Envia mensagem de texto via Z-API Oficial na nuvem
 */
export const enviarMensagemZApi = async (telefone, mensagem) => {
  const phoneNormalizado = normalizarTelefoneZApi(telefone);
  if (!phoneNormalizado || !mensagem) {
    return { success: false, error: 'Telefone ou mensagem inválida' };
  }

  try {
    const res = await fetch(`${ZAPI_CONFIG.baseUrl}/send-text`, {
      method: 'POST',
      headers: {
        'Client-Token': ZAPI_CONFIG.clientToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phoneNormalizado,
        message: mensagem
      })
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    } else {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData };
    }
  } catch (err) {
    console.error('Erro ao enviar mensagem via Z-API:', err);
    return { success: false, error: err.message };
  }
};
