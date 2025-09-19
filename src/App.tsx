import './App.css'
import { RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './app/store'
import { checkAuthStatus } from './features/auth/redux/auth-thunks'
import { router } from './app/router'
import { ThemeProvider } from './app/theme'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuthStatus())
  }, [dispatch])

  return (
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <ThemeProvider initialMode="dark">
        <RouterProvider router={router} />
      </ThemeProvider>
    </SnackbarProvider>
  )
}

export default App
