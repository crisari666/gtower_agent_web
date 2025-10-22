import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { BodyPart, BodyPartFilters } from '../types/body-part.types'

export type BodyPartsSliceState = {
  bodyParts: BodyPart[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
  filters: BodyPartFilters
  selectedBodyPart: BodyPart | null
  isModalOpen: boolean
  modalMode: 'create' | 'edit'
}

const initialState: BodyPartsSliceState = {
  bodyParts: [],
  status: 'idle',
  error: null,
  filters: {},
  selectedBodyPart: null,
  isModalOpen: false,
  modalMode: 'create',
}

export const bodyPartsSlice = createSlice({
  name: 'bodyParts',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.status = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setBodyParts: (state, action: PayloadAction<BodyPart[]>) => {
      state.bodyParts = action.payload
    },
    addBodyPart: (state, action: PayloadAction<BodyPart>) => {
      state.bodyParts.push(action.payload)
    },
    updateBodyPart: (state, action: PayloadAction<BodyPart>) => {
      const index = state.bodyParts.findIndex(bodyPart => bodyPart === state.selectedBodyPart)
      if (index !== -1) {
        state.bodyParts[index] = action.payload
      }
    },
    removeBodyPart: (state, action: PayloadAction<string>) => {
      state.bodyParts = state.bodyParts.filter(bodyPart => bodyPart !== state.selectedBodyPart)
    },
    setFilters: (state, action: PayloadAction<BodyPartFilters>) => {
      state.filters = action.payload
    },
    setSelectedBodyPart: (state, action: PayloadAction<BodyPart | null>) => {
      state.selectedBodyPart = action.payload
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    setModalMode: (state, action: PayloadAction<'create' | 'edit'>) => {
      state.modalMode = action.payload
    },
    openCreateModal: (state) => {
      state.isModalOpen = true
      state.modalMode = 'create'
      state.selectedBodyPart = null
    },
    openEditModal: (state, action: PayloadAction<BodyPart>) => {
      state.isModalOpen = true
      state.modalMode = 'edit'
      state.selectedBodyPart = action.payload
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.selectedBodyPart = null
    },
  },
})

export const {
  setStatus,
  setError,
  setBodyParts,
  addBodyPart,
  updateBodyPart,
  removeBodyPart,
  setFilters,
  setSelectedBodyPart,
  setModalOpen,
  setModalMode,
  openCreateModal,
  openEditModal,
  closeModal,
} = bodyPartsSlice.actions

export default bodyPartsSlice.reducer
