import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Divider } from '@mui/material'
import { AppDispatch, RootState } from '../../../app/store'
import { fetchConversations } from '../redux/chat-thunks'
import ChatComponent from './chat.component'
import ConversationsList from './conversations-list.component'

const ChatView: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { conversations } = useSelector((state: RootState) => state.chat)

  useEffect(() => {
    // Fetch conversations when component mounts
    if (conversations.length === 0) {
      dispatch(fetchConversations({ page: 1, limit: 20 }))
    }
  }, [dispatch, conversations.length])

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* Conversations Column */}
        <Box sx={{ width: { xs: '100%', md: '35%', lg: '30%' }, height: '100%' }}>
          <ConversationsList selectedConversationId={customerId} />
        </Box>
        
        {/* Vertical Divider */}
        <Divider orientation="vertical" flexItem />
        
        {/* Chat Messages Column */}
        <Box sx={{ flex: 1, height: '100%' }}>
          {customerId ? (
            <ChatComponent customerId={customerId} />
          ) : (
            <Paper sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: 0
            }}>
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Select a conversation
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Choose a conversation from the list to start chatting
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ChatView
