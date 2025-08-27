import React from 'react'
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Customer } from '../../customer/types/customer.types'
import { startConversation, clearCustomerConversation } from '../redux/chat-thunks'
import ClearConversationModal from './clear-conversation-modal'
import { AppDispatch } from '../../../app/store'

interface CustomersChatListProps {
  customers: Customer[]
  selectedCustomerId?: string
}

const CustomersChatList: React.FC<CustomersChatListProps> = ({ 
  customers, 
  selectedCustomerId 
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)
  const [isClearModalOpen, setIsClearModalOpen] = React.useState(false)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, customer: Customer) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setSelectedCustomer(customer)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedCustomer(null)
  }

  const handleStartConversation = () => {
    if (selectedCustomer) {
      dispatch(startConversation({
        request: {
          customerId: selectedCustomer._id,
          languageCode: 'en', // Default language
          customMessage: '', // Empty for default template message
          templateName: 'start_conversation_es' // Default template
        },
        navigate
      }))
      handleMenuClose()
    }
  }

  const handleClearClick = () => {
    handleMenuClose()
    setIsClearModalOpen(true)
  }

  const handleClearConfirm = () => {
    if (selectedCustomer) {
      dispatch(clearCustomerConversation({ customerId: selectedCustomer._id }))
      setIsClearModalOpen(false)
      if (selectedCustomerId === selectedCustomer._id) {
        navigate('/dashboard/chats')
      }
    }
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List sx={{ width: '100%', p: 0 }}>
        {customers.map((customer) => (
          <ListItem
            key={customer._id}
            alignItems="flex-start"
            sx={{
              cursor: 'pointer',
              bgcolor: customer._id === selectedCustomerId ? 'action.selected' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
            onClick={() => navigate(`/dashboard/chat/${customer._id}`)}
          >
            <ListItemAvatar>
              <Avatar>{customer.name.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={customer.name}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {customer.email || customer.whatsapp}
                </Typography>
              }
            />
            <IconButton 
              edge="end" 
              aria-label="more"
              onClick={(e) => handleMenuClick(e, customer)}
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      
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
        customerName={selectedCustomer?.name || 'this customer'}
      />
    </Box>
  )
}

export default CustomersChatList