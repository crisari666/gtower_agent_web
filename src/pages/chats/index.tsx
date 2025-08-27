import React from 'react';
import { Box } from '@mui/material';
import ChatView from '../../features/chats/components/chat-view.component';

const ChatsPage: React.FC = () => {
  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      <ChatView />
    </Box>
  );
};

export default ChatsPage;
