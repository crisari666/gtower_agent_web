import { ChatConversation } from '../types/chat.types'

export const formatLastMessageTime = (dateString: string): string => {
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

export const truncateMessage = (message: string, maxLength: number = 50): string => {
  return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message
}

export const getStatusColor = (status: string): string => {
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
