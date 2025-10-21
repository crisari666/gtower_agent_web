import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Prospect } from '../types/prospects.types'

export interface ProspectsState {
  readonly prospects: Prospect[];
  readonly isLoading: boolean;
  readonly error: string | null;
}

const initialState: ProspectsState = {
  prospects: [],
  isLoading: false,
  error: null,
}

export const prospectsSlice = createSlice({
  name: 'prospects',
  initialState,
  reducers: {
    setProspects: (state, action: PayloadAction<Prospect[]>) => {
      state.prospects = action.payload
      state.error = null
    },
    addProspect: (state, action: PayloadAction<Prospect>) => {
      state.prospects.push(action.payload)
      state.error = null
    },
    updateProspect: (state, action: PayloadAction<Prospect>) => {
      const index = state.prospects.findIndex(p => p._id === action.payload._id)
      if (index !== -1) {
        state.prospects[index] = action.payload
      }
      state.error = null
    },
    removeProspect: (state, action: PayloadAction<string>) => {
      state.prospects = state.prospects.filter(p => p._id !== action.payload)
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
  setProspects, 
  addProspect, 
  updateProspect, 
  removeProspect, 
  setLoading, 
  setError, 
  clearError 
} = prospectsSlice.actions

export default prospectsSlice.reducer
