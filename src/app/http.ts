import { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
// import { OmegaSoftConstants } from './khas-web-constants'
import { store } from './store'
// import { endSessionForceUserAction } from '../features/signin/signin.slice'
const urlApi = process.env.REACT_APP_API_URL
console.log({urlApi})
const apiAxios = axios.create({
  baseURL: urlApi,
  headers: {
    'Content-type': 'application/json',
  },
})

export default class Api {
  private static instance: Api
  
  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api()
    }
    return Api.instance
  }

  async get({ path, data, body }: { path: string; data?: object, body?: object }) {
    const token = await this.getToken()
    //console.log({ token })
    const headers = { token: token! }
    try {
      const responseGet: AxiosResponse = await apiAxios.get(path, {
        params: data,
        data: body,
        headers,
      })
      return responseGet.data
    } catch (error) {
      const e = error as AxiosError
      if (
        e.response?.status === 401 &&
        e.response?.data !== undefined &&
        e.response?.data !== undefined
      ) {
        const data: any = e.response?.data
        if (data.error != null && data.error === 'Unauthorized') {
          // store.dispatch(endSessionForceUserAction())
          // localStorage.removeItem('auth')
        }
      }
    }
  }

  async post({ path, data, isFormData = false }: { path: string; data: any, isFormData?: boolean}) {
    try {
      const token = await this.getToken()
      
      const headers = { token: token!, 'Content-type': isFormData ? 'multipart/form-data' : 'application/json'}
      const responsePost: AxiosResponse = await apiAxios.post(path, data, {
        headers,
      })
      //console.log({responsePost});
      return await responsePost.data
    } catch (error) {
      const e = error as AxiosError
      if (
        e.response?.status === 401 &&
        e.response?.data !== undefined &&
        e.response?.data !== undefined
      ) {
        const data: any = e.response?.data
        if (data.error != null && data.error === 'Unauthorized') {
          // store.dispatch(endSessionForceUserAction())
          // localStorage.removeItem('auth')
        }
      }
    }
  }
 
  async patch({ path, data= {}, isFormData = false }: { path: string; data?: any, isFormData?: boolean}) {
    try {
      const token = await this.getToken()
      const urlApi = process.env.REACT_APP_API_URL
      
      const headers = { token: token!, 'Content-type': isFormData ? 'multipart/form-data' : 'application/json'}
      const responsePost: AxiosResponse = await apiAxios.patch(path, data, {
        headers,
      })
      //console.log({responsePost});
      return await responsePost.data
    } catch (error) {
      const e = error as AxiosError
      if (
        e.response?.status === 401 &&
        e.response?.data !== undefined &&
        e.response?.data !== undefined
      ) {
        const data: any = e.response?.data
        if (data.error != null && data.error === 'Unauthorized') {
          // store.dispatch(endSessionForceUserAction())
          // localStorage.removeItem('auth')
        }
      }
    }
  }

  async put({ path, data = {} }: { path: string; data?: object }) {
    try {
      const token = await this.getToken()
      const headers = { token: token! }
      const responsePut: AxiosResponse = await apiAxios.put(path, data, {
        headers,
      })
      //console.log({responsePut});
      return await responsePut.data
    } catch (error) {
      const e = error as AxiosError
      if (
        e.response?.status === 401 &&
        e.response?.data !== undefined &&
        e.response?.data !== undefined
      ) {
        const data: any = e.response?.data
        if (data.error != null && data.error === 'Unauthorized') {
          // store.dispatch(endSessionForceUserAction())
          // localStorage.removeItem(OmegaSoftConstants.localstorageAuthKey)
        }
      }
    }
  }

  async delete({ path, data }: { path: string; data?: object }) {
    try {
      const token = await this.getToken()
      const headers = { token: token! }
      const responseDelete: AxiosResponse = await apiAxios.delete(path, {
        data: data,
        headers,
      })
      //console.log({responseDelete});
      return await responseDelete.data
    } catch (error) {
      const e = error as AxiosError
      if (
        e.response?.status === 401 &&
        e.response?.data !== undefined &&
        e.response?.data !== undefined
      ) {
        const data: any = e.response?.data
        if (data.error != null && data.error === 'Unauthorized') {
          // store.dispatch(endSessionForceUserAction())
          // localStorage.removeItem(OmegaSoftConstants.localstorageAuthKey)
        }
      }
    }
  }

  getToken(): string | null {
    return '999'
    // return localStorage.getItem(OmegaSoftConstants.localstorageTokenKey)
  }
}
