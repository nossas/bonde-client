import { getStates } from "../../services/utils";

export default {
  state: getStates(),
  availability: [
    {
      label: "MSR-Inscrita",
      value: "inscrita",
    },
    {
      label: "Disponível",
      value: "disponivel",
    },
    {
      label: "Indisponível - Férias",
      value: "indisponível_férias",
    },
    {
      label: "Indisponível - Maternidade",
      value: "indisponível_maternidade",
    },
    {
      label: "Indisponível - Agenda",
      value: "indisponível_agenda",
    },
    {
      label: "Indisponível - Sem Resposta",
      value: "indisponível_-sem_resposta",
    },
    {
      label: "Dados incompletos - Endereço",
      value: "dados_incompletos_endereço",
    },
    {
      label: "Dados incompletos - Telefone",
      value: "dados_incompletos_telefone",
    },
    {
      label: "Dados incompletos - Email",
      value: "dados_incompletos_email",
    },
    {
      label: "Desabilitada",
      value: "desabilitada",
    },
    {
      label: "Descadastrada",
      value: "descadastrada",
    },
    {
      label: "Reprovada - Estudo de Caso",
      value: "reprovada_estudo_de_caso",
    },
    {
      label: "Reprovada - Diretrizes do Mapa",
      value: "reprovada_diretrizes_do_mapa",
    },
    {
      label: "Reprovada - Registro inválido",
      value: "reprovada_registro_inválido",
    },
    {
      label: "Aprovada",
      value: "aprovada",
    },
    {
      label: "Anti-ética",
      value: "anti-etica",
    },
  ],
  userStatus: [
    {
      label: "Inscrita no BONDE",
      value: "inscrita_no_bonde",
    },
    {
      label: "Reprovada - Estudo de Caso",
      value: "reprovada_-_estudo_de_caso",
    },
    {
      label: "Reprovada - Diretrizes do Mapa",
      value: "reprovada_-_diretrizes_do_mapa",
    },
    {
      label: "Reprovada - Registro inválido",
      value: "reprovada_-_registro_inválido",
    },
    {
      label: "Aprovada",
      value: "aprovada",
    },
    {
      label: "Aprovada e Validada",
      value: "aprovada_e_validada",
    },
  ],
  relationshipStatus: [
    {
      label: "Solicitação Recebida",
      value: "solicitação_recebida",
    },
    {
      label: "Encaminhamento: Aguardando confirmação",
      value: "encaminhamento__aguardando_confirmação",
    },
    {
      label: "Encaminhamento: Negado",
      value: "encaminhamento__negado",
    },
    {
      label: "Encaminhamento: Realizado",
      value: "encaminhamento__realizado",
    },
    {
      label: "Encaminhamento: Realizado para Serviço Público",
      value: "encaminhamento__realizado_para_serviço_público",
    },
    {
      label: "Atendimento: Iniciado",
      value: "atendimento__iniciado",
    },
    {
      label: "Atendimento: Concluído",
      value: "atendimento__concluído",
    },
    {
      label: "Atendimento: Interrompido",
      value: "atendimento__interrompido",
    },
    {
      label: "Encaminhamento: Antigo",
      value: "encaminhamento__antigo",
    },
    {
      label: "Encaminhamento: Confirmou disponibilidade",
      value: "encaminhamento__confirmou_disponibilidade",
    },
    {
      label: "Solicitação Repetida",
      value: "solicitação_repetida",
    },
  ],
};
