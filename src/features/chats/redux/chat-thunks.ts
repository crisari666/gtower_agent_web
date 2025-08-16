import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../app/store'
import { 
  setMessages, 
  setCurrentCustomer, 
  setLoading, 
  setError, 
  clearError, 
  setPagination 
} from './chat-slice'
import ChatsService from '../services/chats.service'
import CustomersService from '../../customer/services/customers-service'

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
