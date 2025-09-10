import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../app/store'
import { NavigateFunction } from 'react-router-dom'
import { 
  setMessages, 
  setConversations,
  setCurrentCustomer, 
  setLoading, 
  setError, 
  clearError, 
  setPagination 
} from './chat-slice'
import ChatsService from '../services/chats.service'
import { StartConversationRequest } from '../types/chat.types'
import CustomersService from '../../customer/services/customers-service'
import { ChatConversation } from '../types/chat.types'

export const fetchConversations = createAsyncThunk<
  void,
  { page?: number; limit?: number },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('chat/fetchConversations', async ({ page = 1, limit = 20 }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const chatsService = ChatsService.getInstance()
    const customersService = CustomersService.getInstance()
    const conversationsResponse = await chatsService.getConversations(page, limit)
    
    // Fetch customer data for each conversation and filter out those without customer data
    const conversationsWithCustomers = await Promise.all(
      conversationsResponse.conversations.map(async (conversation) => {
        try {
          const customer = await customersService.getCustomerById(conversation.customerId)
          return customer ? {
            ...conversation,
            customer
          } : null
        } catch (error) {
          console.warn(`Failed to fetch customer ${conversation.customerId}:`, error)
          return null
        }
      })
    )
    
    // Filter out conversations without customer data and ensure proper typing
    const validConversations = conversationsWithCustomers.filter((conversation): conversation is ChatConversation => conversation !== null)
    
    dispatch(setConversations(validConversations))
    dispatch(setPagination({
      page: conversationsResponse.page,
      limit: conversationsResponse.limit,
      total: conversationsResponse.total,
      totalPages: conversationsResponse.totalPages,
      hasNextPage: conversationsResponse.hasNextPage,
      hasPreviousPage: conversationsResponse.hasPreviousPage,
    }))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch conversations'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const startConversation = createAsyncThunk<
  void,
  { request: StartConversationRequest; navigate: NavigateFunction },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('chat/startConversation', async ({ request, navigate }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const chatsService = ChatsService.getInstance()
    await chatsService.startConversation(request)
    
    // Redirect to chat view
    navigate(`/dashboard/chat/${request.customerId}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to start conversation'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const fetchCustomerConversation = createAsyncThunk<
  void,
  { customerId: string; page?: number; limit?: number },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('chat/fetchCustomerConversation', async ({ customerId, page = 1, limit = 50 }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const chatsService = ChatsService.getInstance()
    const customersService = CustomersService.getInstance()
    
    // Fetch conversation and customer data in parallel
    const [conversationResponse, customer] = await Promise.all([
      chatsService.getCustomerConversation(customerId, page, limit),
      customersService.getCustomerById(customerId)
    ])
    
    if (customer) {
      dispatch(setCurrentCustomer(customer))
    }
    
    dispatch(setMessages(conversationResponse.messages))
    dispatch(setPagination({
      page: conversationResponse.page,
      limit: conversationResponse.limit,
      total: conversationResponse.total,
      totalPages: conversationResponse.totalPages,
      hasNextPage: conversationResponse.hasNextPage,
      hasPreviousPage: conversationResponse.hasPreviousPage,
    }))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch customer conversation'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const clearCustomerConversation = createAsyncThunk<
  void,
  { customerId: string },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('chat/clearCustomerConversation', async ({ customerId }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const chatsService = ChatsService.getInstance()
    await chatsService.clearConversation(customerId)
    
    // Clear messages from the current view
    dispatch(setMessages([]))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to clear conversation'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})