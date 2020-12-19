export type Relationships = Array<{
  individualsTicketId: number;
  volunteersTicketId: number;
  status: string;
  createdAt: number;
  recipientTicket: {
    agentId: number;
  };
  volunteer: {
    firstName: string;
    organizationId: number;
    id: number;
    state: string;
    phone: string | null;
    whatsapp: string | null;
  };
  recipient: {
    firstName: string;
    organizationId: number;
    id: number;
    state: string;
    phone: string | null;
    whatsapp: string | null;
  };
  agent?: number;
}>;

export type MatchesData = {
  relationships: Relationships;
  relationshipsCount: {
    aggregate: {
      count: number;
    };
  };
};

export type MapaMatchVariables = {
  input: {
    recipient: {
      external_id: string | null;
      nome_msr: string;
      ticket_id: number;
      organization_id: number;
      requester_id: number;
    };
    agent?: number;
    volunteer: {
      name: string;
      user_id: number;
      organization_id: number;
      registration_number: string;
      phone: string;
      whatsapp: string;
    };
    community_id: number;
  };
};

export type RedesMatchVariables = {
  input: {
    recipient_id: number;
    volunteer_id: number;
    status: string;
  };
  recipientId: number;
  volunteerId: number;
};