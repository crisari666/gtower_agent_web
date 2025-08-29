import { io, Socket } from 'socket.io-client'
import { WhatsAppMessageEvent, WhatsAppStatusUpdate } from '../features/chats/types/chat.types'
import { store } from '../app/store'
import { addMessage, updateConversation, setNeedsConversationsRefresh } from '../features/chats/redux/chat-slice'

export class WebSocketService {
  private static instance: WebSocketService
  private socket: Socket | null = null
  private isConnected: boolean = false
  private messageCallbacks: ((message: WhatsAppMessageEvent) => void)[] = []
  private statusCallbacks: ((status: WhatsAppStatusUpdate) => void)[] = []

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  public connect(serverUrl: string): void {
    if (this.socket) {
      return
    }

    this.socket = io(serverUrl, {
      transports: ['websocket'],
      autoConnect: true,
    })

    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    if (!this.socket) return

    // Connection events
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server')
      this.isConnected = true
      this.joinGeneralRoom()
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
      this.isConnected = false
    })

    // WhatsApp events
    this.socket.on('whatsappMessage', (message: WhatsAppMessageEvent) => {
      this.handleWhatsAppMessage(message)
    })

    this.socket.on('whatsappMessageStatus', (statusUpdate: WhatsAppStatusUpdate) => {
      this.handleMessageStatusUpdate(statusUpdate)
    })

    // Error handling
    this.socket.on('connect_error', (error: Error) => {
      console.error('Connection error:', error)
      this.handleConnectionError(error)
    })

    this.socket.on('error', (error: Error) => {
      console.error('Socket error:', error)
    })
  }

  public joinCustomerRoom(customerId: string): void {
    if (!this.socket || !this.isConnected) return
    this.socket.emit('joinWhatsAppCustomer', customerId)
  }

  public leaveCustomerRoom(customerId: string): void {
    if (!this.socket || !this.isConnected) return
    this.socket.emit('leaveWhatsAppCustomer', customerId)
  }

  public onMessage(callback: (message: WhatsAppMessageEvent) => void): () => void {
    this.messageCallbacks.push(callback)
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback)
    }
  }

  public onStatusUpdate(callback: (status: WhatsAppStatusUpdate) => void): () => void {
    this.statusCallbacks.push(callback)
    return () => {
      this.statusCallbacks = this.statusCallbacks.filter(cb => cb !== callback)
    }
  }

  private handleWhatsAppMessage(message: WhatsAppMessageEvent): void {
    // Log all WhatsApp messages received (since we're in the general room)
    console.log('WhatsApp message received:', message)
    
    // Convert WhatsApp message to ChatMessage format
    const chatMessage = this.convertWhatsAppMessageToChatMessage(message)
    
    // Get current state to determine if chat is open
    const currentState = store.getState()
    const currentCustomer = currentState.chat.currentCustomer
    
    if (currentCustomer && currentCustomer._id === message.customerId) {
      // Chat is currently open for this customer - add message to message list
      store.dispatch(addMessage(chatMessage))
    } else {
      // Chat is not open - update conversation in the list
      const currentConversation = currentState.chat.conversations.find(
        conv => conv.customerId === message.customerId
      )
      
      if (currentConversation) {
        // For now, we'll increment unread count by 1 (this should ideally come from the backend)
        const unreadCount = currentConversation.unreadCount + 1
        
        store.dispatch(updateConversation({
          customerId: message.customerId,
          message: chatMessage,
          unreadCount
        }))
      } else {
        // If conversation doesn't exist yet, it will be updated when conversations are fetched
        store.dispatch(setNeedsConversationsRefresh(true))
      }
    }
    
    // Notify all registered callbacks (for backward compatibility)
    this.messageCallbacks.forEach(callback => callback(message))
  }

  private convertWhatsAppMessageToChatMessage(whatsappMessage: WhatsAppMessageEvent) {
    return {
      _id: whatsappMessage._id,
      conversationId: whatsappMessage.conversationId,
      customerId: whatsappMessage.customerId,
      senderType: whatsappMessage.senderType,
      messageType: whatsappMessage.messageType,
      content: whatsappMessage.content,
      status: whatsappMessage.status,
      createdAt: whatsappMessage.createdAt
    }
  }

  private handleMessageStatusUpdate(statusUpdate: WhatsAppStatusUpdate): void {
    this.statusCallbacks.forEach(callback => callback(statusUpdate))
  }

  private handleConnectionError(error: Error): void {
    // Implement retry logic with exponential backoff
    setTimeout(() => {
      if (this.socket) {
        this.socket.connect()
      }
    }, 5000)
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
    }
  }

  public isConnectedToServer(): boolean {
    return this.isConnected
  }

  private joinGeneralRoom(): void {
    if (!this.socket || !this.isConnected) return
    this.socket.emit('joinWhatsAppRoom', 'whatsapp:general')
    console.log('Joined WhatsApp general room')
  }
}

export const websocketService = WebSocketService.getInstance()
