import { Customer } from '../../customer/types/customer.types'

export interface BaseMessage {
  _id: string
  senderType: 'agent' | 'customer'
  messageType: string
  content: string
  status: string
  createdAt: string
}

export interface ChatMessage extends BaseMessage {
  conversationId: string
  customerId: string
}

export interface ChatConversation {
  _id: string
  customerId: string
  customer: Customer
  lastMessage?: ChatMessage
  unreadCount: number
  status: string
  createdAt: string
  updatedAt: string
}

export interface ChatState {
  messages: ChatMessage[]
  conversations: ChatConversation[]
  currentCustomer: Customer | null
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  needsConversationsRefresh: boolean
}

export interface WhatsAppMessageEvent {
  _id: string
  conversationId: string
  customerId: string
  whatsappNumber: string
  whatsappMessageId: string
  senderType: 'agent' | 'customer'
  messageType: string
  content: string
  status: string
  sentAt?: Date
  deliveredAt?: Date
  readAt?: Date
  metadata?: Record<string, any>
  isTemplate: boolean
  templateName?: string
  timestamp: Date
  createdAt: string
}

export interface WhatsAppStatusUpdate {
  whatsappMessageId: string
  status: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface StartConversationRequest {
  customerId: string
  languageCode: string
  customMessage: string
  templateName: string
}

export interface ConversationResponse {
  messages: ChatMessage[]
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ChatConversationsResponse {
  conversations: ChatConversation[]
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}