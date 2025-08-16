import React, { createContext, useContext, useState, useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import materialThemeData from './material-theme.json'

interface MaterialThemeData {
  schemes: {
    light: Record<string, string>
    'light-medium-contrast': Record<string, string>
    'light-high-contrast': Record<string, string>
    dark: Record<string, string>
    'dark-medium-contrast': Record<string, string>
    'dark-high-contrast': Record<string, string>
  }
  palettes: {
    primary: Record<string, string>
    secondary: Record<string, string>
    tertiary: Record<string, string>
    neutral: Record<string, string>
    'neutral-variant': Record<string, string>
  }
}

const themeData = materialThemeData as MaterialThemeData
export type ThemeMode = 'light' | 'dark'
export type ContrastMode = 'normal' | 'medium' | 'high'

interface ThemeContextType {
  mode: ThemeMode
  contrast: ContrastMode
  toggleMode: () => void
  setContrast: (contrast: ContrastMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const createCustomTheme = (mode: ThemeMode, contrast: ContrastMode = 'normal'): Theme => {
  const schemeKey = contrast === 'normal' ? mode : `${mode}-${contrast}-contrast`
  const scheme = themeData.schemes[schemeKey as keyof typeof themeData.schemes] || themeData.schemes[mode]
  const palettes = themeData.palettes

  return createTheme({
    palette: {
      mode,
      primary: {
        main: scheme.primary,
        light: palettes.primary['80'],
        dark: palettes.primary['20'],
        contrastText: scheme.onPrimary,
      },
      secondary: {
        main: scheme.secondary,
        light: palettes.secondary['80'],
        dark: palettes.secondary['20'],
        contrastText: scheme.onSecondary,
      },
      error: {
        main: scheme.error,
        light: palettes.primary['80'],
        dark: palettes.primary['20'],
        contrastText: scheme.onError,
      },
      background: {
        default: scheme.background,
        paper: scheme.surface,
      },
      text: {
        primary: scheme.onSurface,
        secondary: scheme.onSurfaceVariant,
      },
      divider: scheme.outline,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        color: scheme.onSurface,
      },
      h2: {
        color: scheme.onSurface,
      },
      h3: {
        color: scheme.onSurface,
      },
      h4: {
        color: scheme.onSurface,
      },
      h5: {
        color: scheme.onSurface,
      },
      h6: {
        color: scheme.onSurface,
      },
      body1: {
        color: scheme.onSurface,
      },
      body2: {
        color: scheme.onSurfaceVariant,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: scheme.background,
            color: scheme.onSurface,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: scheme.surface,
            color: scheme.onSurface,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: scheme.surface,
            color: scheme.onSurface,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          contained: {
            backgroundColor: scheme.primary,
            color: scheme.onPrimary,
            '&:hover': {
              backgroundColor: palettes.primary['60'],
            },
          },
          outlined: {
            borderColor: scheme.outline,
            color: scheme.onSurface,
            '&:hover': {
              backgroundColor: scheme.surfaceVariant,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: scheme.surface,
            color: scheme.onSurface,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: scheme.surface,
            color: scheme.onSurface,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: scheme.onSurface,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: scheme.onSurface,
          },
          secondary: {
            color: scheme.onSurfaceVariant,
          },
        },
      },
    },
  })
}

interface ThemeProviderProps {
  children: React.ReactNode
  initialMode?: ThemeMode
  initialContrast?: ContrastMode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialMode = 'light',
  initialContrast = 'normal'
}) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode)
  const [contrast, setContrast] = useState<ContrastMode>(initialContrast)

  const theme = useMemo(() => createCustomTheme(mode, contrast), [mode, contrast])

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const handleSetContrast = (newContrast: ContrastMode) => {
    setContrast(newContrast)
  }

  const contextValue = useMemo(() => ({
    mode,
    contrast,
    toggleMode,
    setContrast: handleSetContrast,
  }), [mode, contrast])

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeProvider
