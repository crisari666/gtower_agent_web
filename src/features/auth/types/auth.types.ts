export interface User {
  readonly id: string
  readonly username: string
  readonly enabled: boolean
}

export interface AuthState {
  readonly user: User | null
  readonly token: string | null
  readonly isAuthenticated: boolean
  readonly isLoading: boolean
  readonly error: string | null
}

export interface SignInRequest {
  readonly identifier: string
  readonly password: string
}

export interface SignInResponse {
  readonly access_token: string
  readonly user: User
}

export interface UnauthorizedResponse {
  readonly message: string
  readonly error: string
  readonly statusCode: number
}
