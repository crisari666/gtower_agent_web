export interface User {
  readonly id: string
  readonly email: string
  readonly name: string
  readonly role: string
}

export interface AuthState {
  readonly user: User | null
  readonly isAuthenticated: boolean
  readonly isLoading: boolean
  readonly error: string | null
}

export interface SignInRequest {
  readonly email: string
  readonly password: string
}

export interface SignInResponse {
  readonly user: User
  readonly token: string
}
