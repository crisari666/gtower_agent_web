import { Muscle, CreateMuscleRequest, CreateMultipleMusclesRequest, UpdateMuscleRequest, MuscleFilters } from '../types/muscle.types'
import Api from '../../../app/http'

export class MusclesService {
  private static api = new Api(process.env.REACT_APP_BODYCORE_URL_MS)

  static async getAllMuscles(filters?: MuscleFilters): Promise<Muscle[]> {
    try {
      const queryParams: any = {}
      if (filters?.bodyPart) {
        queryParams.bodyPart = filters.bodyPart
      }
      
      return await this.api.get({ 
        path: '/muscles', 
        data: queryParams 
      })
    } catch (error) {
      throw new Error(`Failed to fetch muscles: ${error}`)
    }
  }

  static async getMuscleById(id: string): Promise<Muscle> {
    try {
      return await this.api.get({ 
        path: `/muscles/${id}` 
      })
    } catch (error) {
      throw new Error(`Failed to fetch muscle: ${error}`)
    }
  }

  static async createMuscle(data: CreateMuscleRequest): Promise<Muscle> {
    try {
      return await this.api.post({ 
        path: '/muscles', 
        data 
      })
    } catch (error) {
      throw new Error(`Failed to create muscle: ${error}`)
    }
  }

  static async createMultipleMuscles(data: CreateMultipleMusclesRequest): Promise<Muscle[]> {
    try {
      return await this.api.post({ 
        path: '/muscles/multiple', 
        data 
      })
    } catch (error) {
      throw new Error(`Failed to create muscles: ${error}`)
    }
  }

  static async updateMuscle(id: string, data: UpdateMuscleRequest): Promise<Muscle> {
    try {
      return await this.api.patch({ 
        path: `/muscles/${id}`, 
        data 
      })
    } catch (error) {
      throw new Error(`Failed to update muscle: ${error}`)
    }
  }

  static async deleteMuscle(id: string): Promise<void> {
    try {
      await this.api.delete({ 
        path: `/muscles/${id}` 
      })
    } catch (error) {
      throw new Error(`Failed to delete muscle: ${error}`)
    }
  }
}
