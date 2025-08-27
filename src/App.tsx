import './App.css'
import { RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { router } from './app/router'
import { ThemeProvider } from './app/theme'

function App() {
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
