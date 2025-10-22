import { createAsyncThunk } from '@reduxjs/toolkit'
import { MusclesService } from '../services/muscles.service'
import { CreateMuscleRequest, UpdateMuscleRequest, MuscleFilters } from '../types/muscle.types'
import { musclesSlice } from './muscles-slice'

export const fetchMuscles = createAsyncThunk(
  'muscles/fetchMuscles',
  async (filters: MuscleFilters | undefined, { rejectWithValue }) => {
    try {
      const muscles = await MusclesService.getAllMuscles(filters)
      return muscles
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch muscles')
    }
  }
)

export const createMuscle = createAsyncThunk(
  'muscles/createMuscle',
  async (data: CreateMuscleRequest, { rejectWithValue, dispatch }) => {
    try {
      const newMuscle = await MusclesService.createMuscle(data)
      dispatch(musclesSlice.actions.addMuscle(newMuscle))
      return newMuscle
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create muscle')
    }
  }
)

export const updateMuscle = createAsyncThunk(
  'muscles/updateMuscle',
  async ({ id, data }: { id: string; data: UpdateMuscleRequest }, { rejectWithValue, dispatch }) => {
    try {
      const updatedMuscle = await MusclesService.updateMuscle(id, data)
      dispatch(musclesSlice.actions.updateMuscle(updatedMuscle))
      return updatedMuscle
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update muscle')
    }
  }
)

export const deleteMuscle = createAsyncThunk(
  'muscles/deleteMuscle',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await MusclesService.deleteMuscle(id)
      dispatch(musclesSlice.actions.removeMuscle(id))
      return id
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete muscle')
    }
  }
)
