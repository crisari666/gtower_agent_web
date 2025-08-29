import Api from '../../../app/http'
import type { ConversationResponse, ChatConversationsResponse, StartConversationRequest } from '../types/chat.types'

export class ChatsService {
  private static instance: ChatsService
  private api: Api

  private constructor() {
    this.api = Api.getInstance()
  }

  public static getInstance(): ChatsService {
    if (!ChatsService.instance) {
      ChatsService.instance = new ChatsService()
    }
    return ChatsService.instance
  }

  async getConversations(
    page: number = 1, 
    limit: number = 100
  ): Promise<ChatConversationsResponse> {
    try {
      const response = await this.api.get({ 
        path: '/chats',
        data: { page, limit }
      })
      
      if (!response) {
        throw new Error('Failed to fetch conversations')
      }
      
      return response
    } catch (error) {
      console.error('Error fetching conversations:', error)
      throw new Error('Failed to fetch conversations')
    }
  }

  async getCustomerConversation(
    customerId: string, 
    page: number = 1, 
    limit: number = 100
  ): Promise<ConversationResponse> {
    try {
      const response = await this.api.get({ 
        path: `/chats/customer/${customerId}/conversation`,
        data: { page, limit }
      })
      
      if (!response) {
        throw new Error('Failed to fetch conversation')
      }
      
      return response
    } catch (error) {
      console.error('Error fetching customer conversation:', error)
      throw new Error('Failed to fetch customer conversation')
    }
  }


  async startConversation(request: StartConversationRequest): Promise<void> {
    try {
      const response = await this.api.post({
        path: '/whatsapp/start-conversation',
        data: request
      })
      
      if (!response) {
        throw new Error('Failed to start conversation')
      }
      
      return response
    } catch (error) {
      console.error('Error starting conversation:', error)
      throw new Error('Failed to start conversation')
    }
  }

  async clearConversation(customerId: string): Promise<void> {
    try {
      const response = await this.api.post({
        path: `/whatsapp/conversation/customer/${customerId}/clear`,
        data: {}
      })
      
      if (!response?.success) {
        throw new Error('Failed to clear conversation')
      }
      
      return response
    } catch (error) {
      console.error('Error clearing conversation:', error)
      throw new Error('Failed to clear conversation')
    }
  }
}

export default ChatsService
