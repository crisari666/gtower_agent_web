import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppDispatch, RootState } from '../../../app/store'
import { signIn } from '../redux/auth-thunks'
import { SignInRequest } from '../types/auth.types'
import styles from './sign-in-form.module.scss'

export const SignInForm: React.FC = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<SignInRequest>({
    identifier: '',
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
      const isAuthenticated = await dispatch(signIn(formData)).unwrap()
      console.log({isAuthenticated})
      if (isAuthenticated) {
        navigate('/dashboard')
      }
      // If authentication fails, the error is already handled in the thunk
      // and displayed in the UI through the error state
    } catch (error) {
      // Error is handled in the thunk
    }
  }

  return (
    <div className={styles['sign-in-form']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="username">{t('auth.username')}</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className={styles['form-group']}>
          <label htmlFor="password">{t('auth.password')}</label>
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
          {isLoading ? t('auth.signingIn') : t('auth.signIn')}
        </button>
      </form>
    </div>
  )
}
