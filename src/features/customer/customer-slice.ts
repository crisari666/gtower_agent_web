import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CustomerState {
  readonly id: string | null;
  readonly name: string | null;
}

const initialState: CustomerState = {
  id: null,
  name: null,
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
  },
})

export const { setCustomer, clearCustomer } = customerSlice.actions

export default customerSlice.reducer


