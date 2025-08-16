import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

interface EmptyConversationsProps {
  title?: string
}

const EmptyConversations: React.FC<EmptyConversationsProps> = ({ 
  title = 'Conversations' 
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
        <Typography variant="body2" color="text.secondary">
          No conversations found
        </Typography>
      </Box>
    </Paper>
  )
}

export default EmptyConversations
