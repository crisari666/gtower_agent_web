import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { MuscleData, CreateMuscleRequest, UpdateMuscleRequest, MuscleFilters } from '../types/muscle.types'

export type MusclesSliceState = {
  muscles: MuscleData[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
  filters: MuscleFilters
  selectedMuscle: MuscleData | null
  isModalOpen: boolean
  modalMode: 'create' | 'edit'
}

const initialState: MusclesSliceState = {
  muscles: [],
  status: 'idle',
  error: null,
  filters: {},
  selectedMuscle: null,
  isModalOpen: false,
  modalMode: 'create',
}

export const musclesSlice = createSlice({
  name: 'muscles',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.status = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setMuscles: (state, action: PayloadAction<MuscleData[]>) => {
      state.muscles = action.payload
    },
    addMuscle: (state, action: PayloadAction<MuscleData>) => {
      state.muscles.push(action.payload)
    },
    updateMuscle: (state, action: PayloadAction<MuscleData>) => {
      const index = state.muscles.findIndex(muscle => muscle === state.selectedMuscle)
      if (index !== -1) {
        state.muscles[index] = action.payload
      }
    },
    removeMuscle: (state, action: PayloadAction<string>) => {
      state.muscles = state.muscles.filter(muscle => muscle !== state.selectedMuscle)
    },
    setFilters: (state, action: PayloadAction<MuscleFilters>) => {
      state.filters = action.payload
    },
    setSelectedMuscle: (state, action: PayloadAction<MuscleData | null>) => {
      state.selectedMuscle = action.payload
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
      state.selectedMuscle = null
    },
    openEditModal: (state, action: PayloadAction<MuscleData>) => {
      state.isModalOpen = true
      state.modalMode = 'edit'
      state.selectedMuscle = action.payload
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.selectedMuscle = null
    },
  }
})

export const {
  setStatus,
  setError,
  setMuscles,
  addMuscle,
  updateMuscle,
  removeMuscle,
  setFilters,
  setSelectedMuscle,
  setModalOpen,
  setModalMode,
  openCreateModal,
  openEditModal,
  closeModal,
} = musclesSlice.actions

export default musclesSlice.reducer
