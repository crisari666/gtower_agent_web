import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth)
  
  // Check if user is authenticated and has a valid token
  const isLoggedIn = isAuthenticated && token && localStorage.getItem('auth_token')

  console.log({isLoggedIn})
  
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}
