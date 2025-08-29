import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../app/store'
import { signIn } from '../redux/auth-thunks'
import { SignInRequest } from '../types/auth.types'
import styles from './sign-in-form.module.scss'

export const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<SignInRequest>({
    email: '',
    password: '',
  })

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    try {
      await dispatch(signIn(formData)).unwrap()
      navigate('/dashboard')
    } catch (error) {
      // Error is handled in the thunk
    }
  }

  return (
    <div className={styles['sign-in-form']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className={styles['form-group']}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className={styles['error-message']}>
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading}
          className={styles['submit-button']}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
