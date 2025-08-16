import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Chip,
} from '@mui/material'
import { useTheme } from '../../app/theme'

export function Home() {
  const { mode, contrast } = useTheme()

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to GTower Agents Customer Platform
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        This platform uses a custom Material Design 3 theme with support for light/dark modes and contrast levels.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Chip 
          label={`Current Theme: ${mode} mode`} 
          color="primary" 
          sx={{ mr: 1 }} 
        />
        <Chip 
          label={`Contrast: ${contrast}`} 
          color="secondary" 
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Primary Colors
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The theme uses custom primary colors from the Material Theme JSON file.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" sx={{ mr: 1 }}>
                  Primary Button
                </Button>
                <Button variant="outlined">
                  Secondary Button
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" component="div" gutterBottom>
              Surface Colors
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card demonstrates the surface colors and text contrast.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip label="Chip 1" sx={{ mr: 1 }} />
              <Chip label="Chip 2" variant="outlined" />
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Theme Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The theme is built using Material Design 3 principles and includes:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2" color="text.secondary">
                Light and dark mode support
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Multiple contrast levels (normal, medium, high)
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Custom color palettes from Material Theme Builder
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Consistent typography and spacing
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
