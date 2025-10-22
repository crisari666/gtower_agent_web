export interface Muscle {
  spanish: string
  english: string
}

export interface MuscleData {
  muscle: Muscle
  bodyPart: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateMuscleRequest {
  muscle: Muscle
  bodyPart: string
}

export interface CreateMultipleMusclesRequest {
  muscles: CreateMuscleRequest[]
}

export interface UpdateMuscleRequest {
  muscle?: Muscle
  bodyPart?: string
}

export interface MuscleFilters {
  bodyPart?: string
}
