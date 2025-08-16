import React from 'react'
import { 
  IconButton, 
  Tooltip, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  SelectChangeEvent 
} from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useTheme } from './theme-provider'

interface ThemeToggleProps {
  showContrastSelector?: boolean
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  showContrastSelector = false 
}) => {
  const { mode, contrast, toggleMode, setContrast } = useTheme()

  const handleContrastChange = (event: SelectChangeEvent) => {
    setContrast(event.target.value as 'normal' | 'medium' | 'high')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showContrastSelector && (
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Contrast</InputLabel>
          <Select
            value={contrast}
            label="Contrast"
            onChange={handleContrastChange}
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      )}
      
      <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ThemeToggle
