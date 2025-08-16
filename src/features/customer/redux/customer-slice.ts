import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Customer } from '../types/customer.types'

export interface CustomerState {
  readonly id: string | null;
  readonly name: string | null;
  readonly customers: Customer[];
  readonly isLoading: boolean;
  readonly error: string | null;
}

const initialState: CustomerState = {
  id: null,
  name: null,
  customers: [],
  isLoading: false,
  error: null,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.id = action.payload.id
      state.name = action.payload.name
    },
    clearCustomer: (state) => {
      state.id = null
      state.name = null
    },
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload
      state.error = null
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
  },
})

export const { 
  setCustomer, 
  clearCustomer, 
  setCustomers, 
  setLoading, 
  setError, 
  clearError 
} = customerSlice.actions

export default customerSlice.reducer


