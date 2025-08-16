import React from 'react'
import { useParams } from 'react-router-dom'
import ChatComponent from './chat.component'

const ChatView: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>()

  if (!customerId) {
    return <div>Customer ID not found</div>
  }

  return <ChatComponent customerId={customerId} />
}

export default ChatView
