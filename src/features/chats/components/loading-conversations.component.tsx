import React from 'react'
import { Box, Typography, Paper, CircularProgress } from '@mui/material'

interface LoadingConversationsProps {
  title?: string
  message?: string
}

const LoadingConversations: React.FC<LoadingConversationsProps> = ({ 
  title = 'Conversations',
  message = 'Loading conversations...'
}) => {
  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
      </Box>
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          {message}
        </Typography>
      </Box>
    </Paper>
  )
}

export default LoadingConversations
