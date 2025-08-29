import Api from '../../../app/http'
import { Prospect, CreateProspectRequest, UpdateProspectRequest } from '../types/prospects.types'

export class ProspectsService {
  private static instance: ProspectsService
  private api: Api

  private constructor() {
    this.api = Api.getInstance()
  }

  public static getInstance(): ProspectsService {
    if (!ProspectsService.instance) {
      ProspectsService.instance = new ProspectsService()
    }
    return ProspectsService.instance
  }

  async getAllProspects(): Promise<Prospect[]> {
    try {
      const response = await this.api.get({ path: '/prospects' })
      return response
    } catch (error) {
      console.error('Error fetching prospects:', error)
      throw new Error('Failed to fetch prospects')
    }
  }

  async getProspectById(id: string): Promise<Prospect | null> {
    try {
      const response = await this.api.get({ path: `/prospects/${id}` })
      return response
    } catch (error) {
      console.error('Error fetching prospect:', error)
      throw new Error('Failed to fetch prospect')
    }
  }

  async createProspect(prospectData: CreateProspectRequest): Promise<Prospect> {
    try {
      const response = await this.api.post({ path: '/prospects', data: prospectData })
      return response
    } catch (error) {
      console.error('Error creating prospect:', error)
      throw new Error('Failed to create prospect')
    }
  }

  async updateProspect(id: string, prospectData: UpdateProspectRequest): Promise<Prospect> {
    try {
      const response = await this.api.patch({ path: `/prospects/${id}`, data: prospectData })
      return response
    } catch (error) {
      console.error('Error updating prospect:', error)
      throw new Error('Failed to update prospect')
    }
  }

  async deleteProspect(id: string): Promise<boolean> {
    try {
      await this.api.delete({ path: `/prospects/${id}` })
      return true
    } catch (error) {
      console.error('Error deleting prospect:', error)
      throw new Error('Failed to delete prospect')
    }
  }
}

export default ProspectsService
