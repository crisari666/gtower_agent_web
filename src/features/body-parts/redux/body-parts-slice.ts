import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../../../app/createAppSlice'
import { AppThunk } from '../../../app/store'
import { BodyPart, BodyPartFilters, CreateBodyPartRequest, UpdateBodyPartRequest } from '../types/body-part.types'
import { BodyPartsService } from '../services/body-parts.service'

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

export const bodyPartsSlice = createAppSlice({
  name: 'bodyParts',
  initialState,
  reducers: create => ({
    setStatus: create.reducer((state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.status = action.payload
    }),
    setError: create.reducer((state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }),
    setBodyParts: create.reducer((state, action: PayloadAction<BodyPart[]>) => {
      state.bodyParts = action.payload
    }),
    addBodyPart: create.reducer((state, action: PayloadAction<BodyPart>) => {
      state.bodyParts.push(action.payload)
    }),
    updateBodyPartSync: create.reducer((state, action: PayloadAction<BodyPart>) => {
      const index = state.bodyParts.findIndex(bodyPart => bodyPart === state.selectedBodyPart)
      if (index !== -1) {
        state.bodyParts[index] = action.payload
      }
    }),
    removeBodyPart: create.reducer((state, action: PayloadAction<string>) => {
      state.bodyParts = state.bodyParts.filter(bodyPart => bodyPart !== state.selectedBodyPart)
    }),
    setFilters: create.reducer((state, action: PayloadAction<BodyPartFilters>) => {
      state.filters = action.payload
    }),
    setSelectedBodyPart: create.reducer((state, action: PayloadAction<BodyPart | null>) => {
      state.selectedBodyPart = action.payload
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
      state.selectedBodyPart = null
    }),
    openEditModal: create.reducer((state, action: PayloadAction<BodyPart>) => {
      state.isModalOpen = true
      state.modalMode = 'edit'
      state.selectedBodyPart = action.payload
    }),
    closeModal: create.reducer((state) => {
      state.isModalOpen = false
      state.selectedBodyPart = null
    }),
    // Async thunks
    fetchBodyParts: create.asyncThunk(
      async (filters: BodyPartFilters | undefined) => {
        const bodyParts = await BodyPartsService.getAllBodyParts(filters)
        console.log({ bodyParts })
        return bodyParts
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.bodyParts = action.payload
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to fetch body parts'
        },
      },
    ),
    createBodyPart: create.asyncThunk(
      async (data: CreateBodyPartRequest) => {
        const newBodyPart = await BodyPartsService.createBodyPart(data)
        return newBodyPart
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.bodyParts.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to create body part'
        },
      },
    ),
    updateBodyPart: create.asyncThunk(
      async ({ id, data }: { id: string; data: UpdateBodyPartRequest }) => {
        const updatedBodyPart = await BodyPartsService.updateBodyPart(id, data)
        return updatedBodyPart
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          const index = state.bodyParts.findIndex(bodyPart => bodyPart === state.selectedBodyPart)
          if (index !== -1) {
            state.bodyParts[index] = action.payload
          }
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to update body part'
        },
      },
    ),
    deleteBodyPart: create.asyncThunk(
      async (id: string) => {
        await BodyPartsService.deleteBodyPart(id)
        return id
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.bodyParts = state.bodyParts.filter(bodyPart => bodyPart !== state.selectedBodyPart)
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to delete body part'
        },
      },
    ),
  }),
  selectors: {
    selectBodyParts: bodyParts => bodyParts.bodyParts,
    selectStatus: bodyParts => bodyParts.status,
    selectError: bodyParts => bodyParts.error,
    selectFilters: bodyParts => bodyParts.filters,
    selectSelectedBodyPart: bodyParts => bodyParts.selectedBodyPart,
    selectIsModalOpen: bodyParts => bodyParts.isModalOpen,
    selectModalMode: bodyParts => bodyParts.modalMode,
  },
})

export const {
  setStatus,
  setError,
  setBodyParts,
  addBodyPart,
  updateBodyPartSync,
  removeBodyPart,
  setFilters,
  setSelectedBodyPart,
  setModalOpen,
  setModalMode,
  openCreateModal,
  openEditModal,
  closeModal,
  fetchBodyParts,
  createBodyPart,
  updateBodyPart,
  deleteBodyPart,
} = bodyPartsSlice.actions

export const {
  selectBodyParts,
  selectStatus,
  selectError,
  selectFilters,
  selectSelectedBodyPart,
  selectIsModalOpen,
  selectModalMode,
} = bodyPartsSlice.selectors

export default bodyPartsSlice.reducer
