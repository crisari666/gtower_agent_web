import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState, ChatMessage, ChatConversation, WhatsAppMessageEvent } from '../types/chat.types'
import { Customer } from '../../customer/types/customer.types'

const initialState: ChatState = {
  messages: [],
  conversations: [],
  currentCustomer: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  needsConversationsRefresh: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload
      state.error = null
    },
    setConversations: (state, action: PayloadAction<ChatConversation[]>) => {
      state.conversations = action.payload
      state.error = null
      state.needsConversationsRefresh = false
    },
    setCurrentCustomer: (state, action: PayloadAction<Customer>) => {
      state.currentCustomer = action.payload
    },
    clearCurrentCustomer: (state) => {
      state.currentCustomer = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
    setPagination: (state, action: PayloadAction<ChatState['pagination']>) => {
      state.pagination = action.payload
    },
    clearChat: (state) => {
      state.messages = []
      state.conversations = []
      state.currentCustomer = null
      state.error = null
      state.pagination = initialState.pagination
      state.needsConversationsRefresh = false
    },
    // New actions for real-time updates
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      // Only add message if it's for the current customer
      if (state.currentCustomer && action.payload.customerId === state.currentCustomer._id) {
        state.messages.push(action.payload)
        
        // Also update the conversation in the list to keep it in sync
        const conversationIndex = state.conversations.findIndex(conv => conv.customerId === action.payload.customerId)
        if (conversationIndex !== -1 && state.conversations[conversationIndex].customer) {
          state.conversations[conversationIndex].lastMessage = action.payload
          state.conversations[conversationIndex].updatedAt = new Date().toISOString()
          // Reset unread count since user is viewing the chat
          state.conversations[conversationIndex].unreadCount = 0
        }
      }
    },
    updateConversation: (state, action: PayloadAction<{ customerId: string; message: ChatMessage; unreadCount: number }>) => {
      const { customerId, message, unreadCount } = action.payload
      const conversationIndex = state.conversations.findIndex(conv => conv.customerId === customerId)
      
      if (conversationIndex !== -1 && state.conversations[conversationIndex].customer) {
        state.conversations[conversationIndex].lastMessage = message
        state.conversations[conversationIndex].unreadCount = unreadCount
        state.conversations[conversationIndex].updatedAt = new Date().toISOString()
      }
    },
    setNeedsConversationsRefresh: (state, action: PayloadAction<boolean>) => {
      state.needsConversationsRefresh = action.payload
    },
  },
})

export const { 
  setMessages, 
  setConversations,
  setCurrentCustomer, 
  clearCurrentCustomer, 
  setLoading, 
  setError, 
  clearError, 
  setPagination, 
  clearChat,
  addMessage,
  updateConversation,
  setNeedsConversationsRefresh
} = chatSlice.actions

export default chatSlice.reducer
