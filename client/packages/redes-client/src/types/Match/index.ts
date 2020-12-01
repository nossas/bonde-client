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
