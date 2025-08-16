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
  IconButton
} from '@mui/material'
import { ArrowBack, Chat as ChatIcon } from '@mui/icons-material'
import { AppDispatch, RootState } from '../../../app/store'
import { fetchCustomerConversation } from '../redux/chat-thunks'
import ChatItem from './chat-item.component'

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
    navigate('/chats')
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          borderBottom: '1px solid #e0e0e0',
          width: '100%',
          borderRadius: 0
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
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: '100%'
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
          messages.map((message) => (
            <ChatItem key={message._id} message={message} />
          ))
        )}
      </Box>
    </Box>
  )
}

export default ChatComponent
