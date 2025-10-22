import { SignInRequest, SignInResponse, UnauthorizedResponse } from '../types/auth.types'
import Api from '../../../app/http'

export class AuthService {
  urlBase = process.env.REACT_APP_API_URL
  console.log({urlBase})
  private api = new Api(urlBase)

  async signIn(credentials: SignInRequest): Promise<SignInResponse> {
    try {
      const response = await this.api.post({
        path: '/auth/login',
        data: credentials
      })

      if (!response) {
        throw new Error('No response received')
      }

      console.log({response})
      return response as SignInResponse
    } catch (error: any) {
      if (error?.response?.data) {
        const errorData = error.response.data as UnauthorizedResponse
        throw new Error(errorData.message || 'Authentication failed')
      }
      throw new Error('Authentication failed')
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.api.post({
        path: '/auth/signout',
        data: {}
      })
    } catch (error) {
      // Even if the API call fails, we should still clear local state
      console.warn('Sign out API call failed:', error)
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      const response = await this.api.get({
        path: '/auth/me'
      })
      return response
    } catch (error) {
      throw new Error('Failed to get current user')
    }
  }
}

export const authService = new AuthService()
