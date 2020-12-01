import { getStates } from "../../services/utils";

export default {
  state: getStates(),
  availability: [
    {
      label: "Disponível",
      value: "disponível",
    },
    {
      label: "Indisponível",
      value: "indisponível",
    },
    {
      label: "Anti-ética",
      value: "anti-ética",
    },
    {
      label: "Férias",
      value: "férias",
    },
    {
      label: "Licença",
      value: "licença",
    },
    {
      label: "Descadastrada",
      value: "descadastrada",
    },
  ],
  userStatus: [
    {
      label: "Inscrita",
      value: "inscrita",
    },
    {
      label: "Reprovada",
      value: "reprovada",
    },
    {
      label: "Aprovada",
      value: "aprovada",
    },
  ],
  relationshipStatus: [
    {
      label: "Encaminhamento: Realizado",
      value: "encaminhamento_realizado",
    },
    {
      label: "Atendimento: Iniciado",
      value: "atendimento_iniciado",
    },
    {
      label: "Atendimento: Concluído",
      value: "atendimento_concluído",
    },
    {
      label: "Atendimento: Interrompido",
      value: "atendimento_interrompido",
    },
  ],
};
