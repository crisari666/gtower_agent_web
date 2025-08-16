import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../app/store'
import { setCustomers, setLoading, setError, clearError } from './customer-slice'
import CustomersService from '../services/customers-service'
import { CreateCustomerRequest, UpdateCustomerRequest } from '../types/customer.types'

export const fetchCustomers = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('customer/fetchCustomers', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const customersService = CustomersService.getInstance()
    const customers = await customersService.getAllCustomers()
    console.log({customers})
    
    dispatch(setCustomers(customers))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch customers'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const createCustomer = createAsyncThunk<
  void,
  CreateCustomerRequest,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('customer/createCustomer', async (customerData, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const customersService = CustomersService.getInstance()
    await customersService.createCustomer(customerData)
    
    // Refresh the customers list after creating
    dispatch(fetchCustomers())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create customer'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const updateCustomer = createAsyncThunk<
  void,
  { id: string; data: UpdateCustomerRequest },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('customer/updateCustomer', async ({ id, data }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const customersService = CustomersService.getInstance()
    await customersService.updateCustomer(id, data)
    
    // Refresh the customers list after updating
    dispatch(fetchCustomers())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update customer'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const deleteCustomer = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('customer/deleteCustomer', async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const customersService = CustomersService.getInstance()
    await customersService.deleteCustomer(id)
    
    // Refresh the customers list after deleting
    dispatch(fetchCustomers())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete customer'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})
