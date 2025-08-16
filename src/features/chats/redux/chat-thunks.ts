import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../app/store'
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
import CustomersService from '../../customer/services/customers-service'

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
    const conversationsResponse = await chatsService.getConversations(page, limit)
    
    dispatch(setConversations(conversationsResponse.conversations))
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
