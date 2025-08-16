import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Typography, 
  Box, 
  Chip, 
  CircularProgress, 
  Alert,
  Paper,
  Divider
} from '@mui/material'
import { Chat as ChatIcon } from '@mui/icons-material'
import { RootState } from '../../../app/store'
import { ChatConversation } from '../types/chat.types'

interface ConversationsListProps {
  selectedConversationId?: string
}

const ConversationsList: React.FC<ConversationsListProps> = ({ 
  selectedConversationId 
}) => {
  const { conversations, isLoading, error } = useSelector((state: RootState) => state.chat)
  const navigate = useNavigate()

  const formatLastMessageTime = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
      
      if (diffInHours < 1) {
        return 'Just now'
      } else if (diffInHours < 24) {
        return `${diffInHours}h ago`
      } else if (diffInHours < 48) {
        return 'Yesterday'
      } else {
        return date.toLocaleDateString()
      }
    } catch {
      return 'Unknown time'
    }
  }

  const truncateMessage = (message: string, maxLength: number = 50): string => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message
  }

  const handleConversationClick = (conversation: ChatConversation): void => {
    navigate(`/chats/${conversation.customerId}`)
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return '#4caf50'
      case 'inactive':
        return '#ff9800'
      case 'closed':
        return '#f44336'
      default:
        return '#9e9e9e'
    }
  }

  if (isLoading) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h3">
            Conversations
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
            Loading conversations...
          </Typography>
        </Box>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h3">
            Conversations
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

  if (conversations.length === 0) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h3">
            Conversations
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

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h3">
          Conversations
        </Typography>
        <Chip 
          label={conversations.length} 
          size="small" 
          color="primary" 
          sx={{ ml: 1 }}
        />
      </Box>
      <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {conversations.map((conversation, index) => (
          <React.Fragment key={conversation._id}>
            <Box
              key={conversation._id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                p: 2,
                cursor: 'pointer',
                backgroundColor: selectedConversationId === conversation._id ? 'primary.light' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedConversationId === conversation._id ? 'primary.light' : 'action.hover',
                },
              }}
              onClick={() => handleConversationClick(conversation)}
            >
              <Box sx={{ position: 'relative', mr: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {conversation.customerName.charAt(0).toUpperCase()}
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(conversation.status),
                    border: '2px solid white',
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {conversation.customerName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatLastMessageTime(conversation.lastMessageAt)}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 1
                  }}
                >
                  {conversation.lastMessageFrom === 'agent' && (
                    <Typography component="span" color="primary.main" sx={{ fontWeight: 500 }}>
                      You: {' '}
                    </Typography>
                  )}
                  {truncateMessage(conversation.lastMessage)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={`${conversation.messageCount} messages`} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                    {conversation.customerWhatsapp}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {index < conversations.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  )
}

export default ConversationsList
