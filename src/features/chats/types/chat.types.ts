import { Customer } from '../../customer/types/customer.types'

export interface ChatMessage {
  readonly _id: string;
  readonly senderType: 'agent' | 'customer';
  readonly messageType: 'text' | 'template' | 'button' | 'image' | 'file';
  readonly content: string;
  readonly status: 'sent' | 'delivered' | 'read' | 'failed';
  readonly createdAt: string;
}

export interface ChatConversation {
  readonly _id: string;
  readonly conversationId: string;
  readonly customerId: string;
  readonly customerName: string;
  readonly customerWhatsapp: string;
  readonly lastMessage: string;
  readonly lastMessageAt: string;
  readonly lastMessageFrom: 'agent' | 'customer';
  readonly status: 'active' | 'inactive' | 'closed';
  readonly messageCount: number;
}

export interface ChatConversationsResponse {
  readonly conversations: ChatConversation[];
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface ConversationResponse {
  readonly messages: ChatMessage[];
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface ChatState {
  readonly messages: ChatMessage[];
  readonly conversations: ChatConversation[];
  readonly currentCustomer: Customer | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
  };
}
