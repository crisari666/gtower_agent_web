import React from 'react'
import { Box, Avatar, Typography, Chip, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ChatConversation } from '../types/chat.types'
import { formatLastMessageTime, truncateMessage, getStatusColor } from './conversations-list.utils'
import { startConversation, clearCustomerConversation } from '../redux/chat-thunks'
import ClearConversationModal from './clear-conversation-modal'
import { AppDispatch } from '../../../app/store'

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
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isClearModalOpen, setIsClearModalOpen] = React.useState(false)

  // Ensure customer is always defined (filtered at list level)
  if (!conversation.customer) {
    return null
  }

  const handleClick = (): void => {
    onClick(conversation)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const handleStartConversation = (): void => {
    if (conversation.customerId) {
      dispatch(startConversation({
        request: {
          customerId: conversation.customerId,
          languageCode: 'es',
          customMessage: '',
          templateName: 'start_conversation_es'
        },
        navigate
      }))
      handleMenuClose()
    }
  }

  const handleClearClick = (): void => {
    handleMenuClose()
    setIsClearModalOpen(true)
  }

  const handleClearConfirm = (): void => {
    if (conversation.customerId) {
      dispatch(clearCustomerConversation({ customerId: conversation.customerId }))
      setIsClearModalOpen(false)
    }
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
            {conversation.customer.name.charAt(0).toUpperCase()}
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
              {conversation.customer.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatLastMessageTime(conversation.updatedAt)}
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
            {conversation.lastMessage?.senderType === 'agent' && (
              <Typography component="span" color="primary.main" sx={{ fontWeight: 500 }}>
                You: {' '}
              </Typography>
            )}
            {truncateMessage(conversation.lastMessage?.content)}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip 
              label={`${conversation.unreadCount} unread`} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
              {conversation.customer.whatsapp}
            </Typography>
          </Box>
        </Box>
        <IconButton 
          edge="end" 
          aria-label="more"
          onClick={handleMenuClick}
          sx={{ ml: 1 }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      {!isLast && <Divider />}
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleStartConversation}>
          Start Conversation
        </MenuItem>
        <MenuItem onClick={handleClearClick}>
          Clear Conversation
        </MenuItem>
      </Menu>

      <ClearConversationModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearConfirm}
        customerName={conversation.customer.name}
      />
    </>
  )
}

export default ConversationItem
