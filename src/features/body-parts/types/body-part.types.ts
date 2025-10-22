export interface BodyPart {
  name: string
  nameEnglish: string
  description: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateBodyPartRequest {
  name: string
  nameEnglish: string
  description: string
  isActive: boolean
}

export interface CreateMultipleBodyPartsRequest {
  bodyParts: CreateBodyPartRequest[]
}

export interface UpdateBodyPartRequest {
  name?: string
  nameEnglish?: string
  description?: string
  isActive?: boolean
}

export interface BodyPartFilters {
  active?: boolean
  language?: 'spanish' | 'english'
  name?: string
}
