import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState, ChatMessage, ChatConversation } from '../types/chat.types'
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
  clearChat 
} = chatSlice.actions

export default chatSlice.reducer
