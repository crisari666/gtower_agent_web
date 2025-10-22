import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../../../app/createAppSlice'
import { AppThunk } from '../../../app/store'
import { Muscle, CreateMuscleRequest, UpdateMuscleRequest, MuscleFilters } from '../types/muscle.types'
import { MusclesService } from '../services/muscles.service'

export type MusclesSliceState = {
  muscles: Muscle[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
  filters: MuscleFilters
  selectedMuscle: Muscle | null
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

export const musclesSlice = createAppSlice({
  name: 'muscles',
  initialState,
  reducers: create => ({
    setStatus: create.reducer((state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.status = action.payload
    }),
    setError: create.reducer((state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }),
    setMuscles: create.reducer((state, action: PayloadAction<Muscle[]>) => {
      state.muscles = action.payload
    }),
    addMuscle: create.reducer((state, action: PayloadAction<Muscle>) => {
      state.muscles.push(action.payload)
    }),
    updateMuscleSync: create.reducer((state, action: PayloadAction<Muscle>) => {
      const index = state.muscles.findIndex(muscle => muscle === state.selectedMuscle)
      if (index !== -1) {
        state.muscles[index] = action.payload
      }
    }),
    removeMuscle: create.reducer((state, action: PayloadAction<string>) => {
      state.muscles = state.muscles.filter(muscle => muscle !== state.selectedMuscle)
    }),
    setFilters: create.reducer((state, action: PayloadAction<MuscleFilters>) => {
      state.filters = action.payload
    }),
    setSelectedMuscle: create.reducer((state, action: PayloadAction<Muscle | null>) => {
      state.selectedMuscle = action.payload
    }),
    setModalOpen: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    }),
    setModalMode: create.reducer((state, action: PayloadAction<'create' | 'edit'>) => {
      state.modalMode = action.payload
    }),
    openCreateModal: create.reducer((state) => {
      state.isModalOpen = true
      state.modalMode = 'create'
      state.selectedMuscle = null
    }),
    openEditModal: create.reducer((state, action: PayloadAction<Muscle>) => {
      state.isModalOpen = true
      state.modalMode = 'edit'
      state.selectedMuscle = action.payload
    }),
    closeModal: create.reducer((state) => {
      state.isModalOpen = false
      state.selectedMuscle = null
    }),
    // Async thunks
    fetchMuscles: create.asyncThunk(
      async (filters: MuscleFilters | undefined) => {
        const muscles = await MusclesService.getAllMuscles(filters)
        return muscles
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.muscles = action.payload
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to fetch muscles'
        },
      },
    ),
    createMuscle: create.asyncThunk(
      async (data: CreateMuscleRequest) => {
        const newMuscle = await MusclesService.createMuscle(data)
        return newMuscle
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.muscles.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to create muscle'
        },
      },
    ),
    updateMuscle: create.asyncThunk(
      async ({ id, data }: { id: string; data: UpdateMuscleRequest }) => {
        const updatedMuscle = await MusclesService.updateMuscle(id, data)
        return updatedMuscle
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          const index = state.muscles.findIndex(muscle => muscle === state.selectedMuscle)
          if (index !== -1) {
            state.muscles[index] = action.payload
          }
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to update muscle'
        },
      },
    ),
    deleteMuscle: create.asyncThunk(
      async (id: string) => {
        await MusclesService.deleteMuscle(id)
        return id
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.muscles = state.muscles.filter(muscle => muscle !== state.selectedMuscle)
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to delete muscle'
        },
      },
    ),
  }),
  selectors: {
    selectMuscles: muscles => muscles.muscles,
    selectStatus: muscles => muscles.status,
    selectError: muscles => muscles.error,
    selectFilters: muscles => muscles.filters,
    selectSelectedMuscle: muscles => muscles.selectedMuscle,
    selectIsModalOpen: muscles => muscles.isModalOpen,
    selectModalMode: muscles => muscles.modalMode,
  },
})

export const {
  setStatus,
  setError,
  setMuscles,
  addMuscle,
  updateMuscleSync,
  removeMuscle,
  setFilters,
  setSelectedMuscle,
  setModalOpen,
  setModalMode,
  openCreateModal,
  openEditModal,
  closeModal,
  fetchMuscles,
  createMuscle,
  updateMuscle,
  deleteMuscle,
} = musclesSlice.actions

export const {
  selectMuscles,
  selectStatus,
  selectError,
  selectFilters,
  selectSelectedMuscle,
  selectIsModalOpen,
  selectModalMode,
} = musclesSlice.selectors

export default musclesSlice.reducer
