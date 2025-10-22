import { createAsyncThunk } from '@reduxjs/toolkit'
import { BodyPartsService } from '../services/body-parts.service'
import { CreateBodyPartRequest, UpdateBodyPartRequest, BodyPartFilters } from '../types/body-part.types'
import { bodyPartsSlice } from './body-parts-slice'

export const fetchBodyParts = createAsyncThunk(
  'bodyParts/fetchBodyParts',
  async (filters: BodyPartFilters | undefined, { rejectWithValue }) => {
    try {
      const bodyParts = await BodyPartsService.getAllBodyParts(filters)
      return bodyParts
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch body parts')
    }
  }
)

export const createBodyPart = createAsyncThunk(
  'bodyParts/createBodyPart',
  async (data: CreateBodyPartRequest, { rejectWithValue, dispatch }) => {
    try {
      const newBodyPart = await BodyPartsService.createBodyPart(data)
      dispatch(bodyPartsSlice.actions.addBodyPart(newBodyPart))
      return newBodyPart
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create body part')
    }
  }
)

export const updateBodyPart = createAsyncThunk(
  'bodyParts/updateBodyPart',
  async ({ id, data }: { id: string; data: UpdateBodyPartRequest }, { dispatch, rejectWithValue }) => {
    try {
      const updatedBodyPart = await BodyPartsService.updateBodyPart(id, data)
      dispatch(bodyPartsSlice.actions.updateBodyPart(updatedBodyPart))
      return updatedBodyPart
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update body part')
    }
  }
)

export const deleteBodyPart = createAsyncThunk(
  'bodyParts/deleteBodyPart',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await BodyPartsService.deleteBodyPart(id)
      dispatch(bodyPartsSlice.actions.removeBodyPart(id))
      return id
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete body part')
    }
  }
)
