import React from 'react'
import { Box, Avatar, Typography, Chip, Divider } from '@mui/material'
import { ChatConversation } from '../types/chat.types'
import { formatLastMessageTime, truncateMessage, getStatusColor } from './conversations-list.utils'

interface ConversationItemProps {
  conversation: ChatConversation
  isSelected: boolean
  isLast: boolean
  onClick: (conversation: ChatConversation) => void
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  isLast,
  onClick
}) => {
  const handleClick = (): void => {
    onClick(conversation)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          p: 2,
          cursor: 'pointer',
          backgroundColor: isSelected ? 'primary.light' : 'transparent',
          '&:hover': {
            backgroundColor: isSelected ? 'primary.light' : 'action.hover',
          },
        }}
        onClick={handleClick}
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
      {!isLast && <Divider />}
    </>
  )
}

export default ConversationItem
