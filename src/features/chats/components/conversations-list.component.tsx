import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  List, 
  Typography, 
  Box, 
  Chip, 
  Paper
} from '@mui/material'
import { RootState } from '../../../app/store'
import { ChatConversation } from '../types/chat.types'
import { formatLastMessageTime, truncateMessage, getStatusColor } from './conversations-list.utils'
import EmptyConversations from './empty-conversations.component'
import ErrorConversations from './error-conversations.component'
import LoadingConversations from './loading-conversations.component'
import ConversationItem from './conversation-item.component'

interface ConversationsListProps {
  selectedConversationId?: string
}

const ConversationsList: React.FC<ConversationsListProps> = ({ 
  selectedConversationId 
}) => {
  const { conversations, isLoading, error } = useSelector((state: RootState) => state.chat)
  const navigate = useNavigate()

  // Filter out conversations without customer data to ensure customer is always defined
  const validConversations = conversations.filter(conversation => conversation.customer)

  const handleConversationClick = (conversation: ChatConversation): void => {
    navigate(`/dashboard/chat/${conversation.customerId}`)
  }

  if (isLoading) {
    return <LoadingConversations />
  }

  if (error) {
    return <ErrorConversations error={error} />
  }

  if (validConversations.length === 0) {
    return <EmptyConversations />
  }

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h3">
          Conversations
        </Typography>
        <Chip 
          label={validConversations.length} 
          size="small" 
          color="primary" 
          sx={{ ml: 1 }}
        />
      </Box>
      <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {validConversations.map((conversation, index) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
            isSelected={selectedConversationId === conversation._id}
            isLast={index === validConversations.length - 1}
            onClick={handleConversationClick}
          />
        ))}
      </List>
    </Paper>
  )
}

export default ConversationsList
