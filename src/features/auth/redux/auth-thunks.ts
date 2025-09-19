import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../app/store'
import { setUser, setLoading, setError, clearError, clearUser } from './auth-slice'
import { SignInRequest, SignInResponse } from '../types/auth.types'
import { authService } from '../services/auth.service'

export const signIn = createAsyncThunk<
  boolean,
  SignInRequest,
  {
    dispatch: AppDispatch
    state: RootState
  }
>(
  'auth/signIn',
  async (credentials, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      dispatch(clearError())
      
      const response = await authService.signIn(credentials)
      
      // Store token in localStorage
      localStorage.setItem('auth_token', response.access_token)
      
      dispatch(setUser({
        user: response.user,
        token: response.access_token
      }))
      dispatch(setLoading(false))
      
      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
      dispatch(setError(errorMessage))
      dispatch(setLoading(false))
      
      return false
    }
  }
)

export const signOut = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>(
  'auth/signOut',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      
      await authService.signOut()
      
      // Clear token from localStorage
      localStorage.removeItem('auth_token')
      
      dispatch(clearUser())
      dispatch(setLoading(false))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed'
      dispatch(setError(errorMessage))
      dispatch(setLoading(false))
    }
  }
)

export const checkAuthStatus = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>(
  'auth/checkAuthStatus',
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem('auth_token')
      
      if (!token) {
        dispatch(clearUser())
        return
      }
      
      // Try to get current user to validate token
      const user = await authService.getCurrentUser()
      
      if (user) {
        dispatch(setUser({
          user: user,
          token: token
        }))
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('auth_token')
        dispatch(clearUser())
      }
    } catch (error) {
      // Token is invalid or expired, clear it
      localStorage.removeItem('auth_token')
      dispatch(clearUser())
    }
  }
)
