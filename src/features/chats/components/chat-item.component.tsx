import React from 'react'
import { Box, Typography, Chip } from '@mui/material'
import { ChatMessage } from '../types/chat.types'

interface ChatItemProps {
  readonly message: ChatMessage;
}

const ChatItem: React.FC<ChatItemProps> = ({ message }) => {
  const isAgent = message.senderType === 'agent'
  
  const getMessageTypeLabel = (messageType: string): string => {
    switch (messageType) {
    case 'template':
      return 'Template'
    case 'button':
      return 'Button'
    case 'image':
      return 'Image'
    case 'file':
      return 'File'
    default:
      return 'Text'
    }
  }

  const formatMessageTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isAgent ? 'flex-end' : 'flex-start',
        mb: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          backgroundColor: isAgent ? 'primary.main' : 'white',
          color: isAgent ? 'white' : 'text.primary',
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
          position: 'relative',
        }}
      >
        {/* Message Type Badge */}
        {message.messageType !== 'text' && (
          <Chip
            label={getMessageTypeLabel(message.messageType)}
            size="small"
            sx={{
              position: 'absolute',
              top: -8,
              left: 8,
              fontSize: '0.7rem',
              height: 20,
              backgroundColor: isAgent ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              color: isAgent ? 'white' : 'text.secondary',
            }}
          />
        )}
        
        {/* Message Content */}
        <Typography 
          variant="body2" 
          sx={{ 
            wordBreak: 'break-word',
            mt: message.messageType !== 'text' ? 1 : 0
          }}
        >
          {message.content}
        </Typography>
        
        {/* Message Time */}
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            mt: 1,
            opacity: 0.7,
            textAlign: 'right'
          }}
        >
          {formatMessageTime(message.createdAt)}
        </Typography>
        
        {/* Status Indicator */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            mt: 0.5 
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              opacity: 0.7,
              fontSize: '0.7rem'
            }}
          >
            {message.status}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatItem
