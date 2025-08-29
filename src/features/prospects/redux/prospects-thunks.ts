import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../app/store'
import { setProspects, setLoading, setError, addProspect, updateProspect, removeProspect } from './prospects-slice'
import ProspectsService from '../services/prospects-service'
import { CreateProspectRequest, UpdateProspectRequest } from '../types/prospects.types'

export const fetchProspects = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('prospects/fetchProspects', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const prospects = await ProspectsService.getInstance().getAllProspects()
    dispatch(setProspects(prospects))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch prospects'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const createProspect = createAsyncThunk<
  void,
  CreateProspectRequest,
  { dispatch: AppDispatch; state: RootState }
>('prospects/createProspect', async (prospectData, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const newProspect = await ProspectsService.getInstance().createProspect(prospectData)
    dispatch(addProspect(newProspect))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create prospect'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const updateProspectById = createAsyncThunk<
  void,
  { id: string; data: UpdateProspectRequest },
  { dispatch: AppDispatch; state: RootState }
>('prospects/updateProspect', async ({ id, data }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const updatedProspect = await ProspectsService.getInstance().updateProspect(id, data)
    dispatch(updateProspect(updatedProspect))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update prospect'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const deleteProspectById = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>('prospects/deleteProspect', async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    await ProspectsService.getInstance().deleteProspect(id)
    dispatch(removeProspect(id))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete prospect'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})
