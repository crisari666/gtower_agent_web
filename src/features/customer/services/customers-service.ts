import Api from '../../../app/http'
import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../types/customer.types'

export class CustomersService {
  private static instance: CustomersService
  private api: Api

  private constructor() {
    this.api = Api.getInstance()
  }

  public static getInstance(): CustomersService {
    if (!CustomersService.instance) {
      CustomersService.instance = new CustomersService()
    }
    return CustomersService.instance
  }

  async getAllCustomers(): Promise<Customer[]> {
    try {
      const response = await this.api.get({ path: '/customers' })
      console.log({response})
      
      return response
    } catch (error) {
      console.error('Error fetching customers:', error)
      throw new Error('Failed to fetch customers')
    }
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    try {
      const response = await this.api.get({ path: `/customers/${id}` })
      return response
    } catch (error) {
      console.error('Error fetching customer:', error)
      throw new Error('Failed to fetch customer')
    }
  }

  async createCustomer(customerData: CreateCustomerRequest): Promise<Customer> {
    try {
      const response = await this.api.post({ path: '/customers', data: customerData })
      return response.data
    } catch (error) {
      console.error('Error creating customer:', error)
      throw new Error('Failed to create customer')
    }
  }

  async updateCustomer(id: string, customerData: UpdateCustomerRequest): Promise<Customer> {
    try {
      const response = await this.api.patch({ path: `/customers/${id}`, data: customerData })
      return response.data
    } catch (error) {
      console.error('Error updating customer:', error)
      throw new Error('Failed to update customer')
    }
  }

  async deleteCustomer(id: string): Promise<boolean> {
    try {
      await this.api.delete({ path: `/customers/${id}` })
      return true
    } catch (error) {
      console.error('Error deleting customer:', error)
      throw new Error('Failed to delete customer')
    }
  }
}

export default CustomersService
