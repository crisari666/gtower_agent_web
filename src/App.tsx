import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { ThemeProvider } from './app/theme'

function App() {
  return (
    <ThemeProvider initialMode="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
