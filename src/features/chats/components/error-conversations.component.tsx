import React from 'react'
import { Box, Typography, Paper, Alert } from '@mui/material'

interface ErrorConversationsProps {
  title?: string
  error: string
}

const ErrorConversations: React.FC<ErrorConversationsProps> = ({ 
  title = 'Conversations',
  error 
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
        <Alert severity="error" sx={{ width: '100%' }}>
          Error: {error}
        </Alert>
      </Box>
    </Paper>
  )
}

export default ErrorConversations
