export interface Customer {
  readonly _id: string;
  readonly name: string;
  readonly phone: string;
  readonly whatsapp: string;
  readonly email: string;
}

export interface CreateCustomerRequest {
  readonly name: string;
  readonly phone: string;
  readonly whatsapp: string;
  readonly email: string;
}

export interface UpdateCustomerRequest {
  readonly name?: string;
  readonly phone?: string;
  readonly whatsapp?: string;
  readonly email?: string;
}
