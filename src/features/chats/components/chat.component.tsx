import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  Paper, 
  Avatar, 
  IconButton,
  Chip
} from '@mui/material'
import { ArrowBack, Chat as ChatIcon } from '@mui/icons-material'
import { AppDispatch, RootState } from '../../../app/store'
import { fetchCustomerConversation } from '../redux/chat-thunks'
import { ChatMessage } from '../types/chat.types'

interface ChatComponentProps {
  readonly customerId: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ customerId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  
  const { messages, currentCustomer, isLoading, error } = useSelector((state: RootState) => state.chat)

  useEffect(() => {
    if (customerId) {
      dispatch(fetchCustomerConversation({ customerId }))
    }
  }, [dispatch, customerId])

  const handleBackClick = () => {
    navigate('/dashboard/customer')
  }

  const formatMessageTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

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

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (!currentCustomer) {
    return (
      <Box mt={2}>
        <Alert severity="warning">Customer not found</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <IconButton onClick={handleBackClick} size="small">
          <ArrowBack />
        </IconButton>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <ChatIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" component="h1">
            {currentCustomer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentCustomer.phone} • {currentCustomer.email}
          </Typography>
        </Box>
      </Paper>

      {/* Messages Container */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          p: 2, 
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        {messages.length === 0 ? (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="200px"
          >
            <Typography variant="body1" color="text.secondary">
              No messages yet
            </Typography>
          </Box>
        ) : (
          messages.map((message: ChatMessage) => {
            const isAgent = message.senderType === 'agent'
            const isCustomer = message.senderType === 'customer'
            
            return (
              <Box
                key={message._id}
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
          })
        )}
      </Box>
    </Box>
  )
}

export default ChatComponent
