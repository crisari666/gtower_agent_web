export interface Muscle {
  _id: string
  name: string
  nameEnglish: string
  bodyPart: string
  __v: number
  createdAt: string
  updatedAt: string
}

export interface CreateMuscleRequest {
  name: string
  nameEnglish: string
  bodyPart: string
}

export interface CreateMultipleMusclesRequest {
  muscles: CreateMuscleRequest[]
}

export interface UpdateMuscleRequest {
  name?: string
  nameEnglish?: string
  bodyPart?: string
}

export interface MuscleFilters {
  bodyPart?: string
}
