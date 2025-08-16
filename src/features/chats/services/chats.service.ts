import Api from '../../../app/http'
import type { ConversationResponse, ChatConversationsResponse } from '../types/chat.types'

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
    limit: number = 20
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
    limit: number = 50
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
}

export default ChatsService
