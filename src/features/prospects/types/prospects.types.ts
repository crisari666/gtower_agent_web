export interface Prospect {
  readonly _id: string;
  readonly customerId: string;
  readonly customerName: string;
  readonly phone: string;
  readonly sentiment: 'positive' | 'negative' | 'neutral';
  readonly isProspect: boolean;
  readonly prospectDate: string;
  readonly confidence: number;
}

export interface CreateProspectRequest {
  readonly customerId: string;
  readonly customerName: string;
  readonly phone: string;
  readonly sentiment?: 'positive' | 'negative' | 'neutral';
  readonly isProspect?: boolean;
  readonly confidence?: number;
}

export interface UpdateProspectRequest {
  readonly customerId?: string;
  readonly customerName?: string;
  readonly phone?: string;
  readonly sentiment?: 'positive' | 'negative' | 'neutral';
  readonly isProspect?: boolean;
  readonly confidence?: number;
}
