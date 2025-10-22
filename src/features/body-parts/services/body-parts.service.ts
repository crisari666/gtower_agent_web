import { BodyPart, CreateBodyPartRequest, CreateMultipleBodyPartsRequest, UpdateBodyPartRequest, BodyPartFilters } from '../types/body-part.types'
import Api from '../../../app/http'

export class BodyPartsService {
  private static api = new Api(process.env.REACT_APP_BODYCORE_URL_MS)

  static async getAllBodyParts(filters?: BodyPartFilters): Promise<BodyPart[]> {
    try {
      const queryParams: any = {}
      if (filters?.active !== undefined) {
        queryParams.active = filters.active
      }
      if (filters?.language) {
        queryParams.language = filters.language
      }
      if (filters?.name) {
        queryParams.name = filters.name
      }
      
      return await this.api.get({ 
        path: '/body-parts', 
        data: queryParams 
      })
    } catch (error) {
      throw new Error(`Failed to fetch body parts: ${error}`)
    }
  }

  static async getBodyPartById(id: string): Promise<BodyPart> {
    try {
      return await this.api.get({ 
        path: `/body-parts/${id}` 
      })
    } catch (error) {
      throw new Error(`Failed to fetch body part: ${error}`)
    }
  }

  static async createBodyPart(data: CreateBodyPartRequest): Promise<BodyPart> {
    try {
      return await this.api.post({ 
        path: '/body-parts', 
        data 
      })
    } catch (error) {
      throw new Error(`Failed to create body part: ${error}`)
    }
  }

  static async createMultipleBodyParts(data: CreateMultipleBodyPartsRequest): Promise<BodyPart[]> {
    try {
      return await this.api.post({ 
        path: '/body-parts/multiple', 
        data 
      })
    } catch (error) {
      throw new Error(`Failed to create body parts: ${error}`)
    }
  }

  static async updateBodyPart(id: string, data: UpdateBodyPartRequest): Promise<BodyPart> {
    try {
      return await this.api.patch({ 
        path: `/body-parts/${id}`, 
        data 
      })
    } catch (error) {
      throw new Error(`Failed to update body part: ${error}`)
    }
  }

  static async deleteBodyPart(id: string): Promise<void> {
    try {
      await this.api.delete({ 
        path: `/body-parts/${id}` 
      })
    } catch (error) {
      throw new Error(`Failed to delete body part: ${error}`)
    }
  }
}
