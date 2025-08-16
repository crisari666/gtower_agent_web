import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress, 
  Alert, 
  Box, 
  Typography,
  IconButton,
  Tooltip
} from '@mui/material'
import { Chat as ChatIcon } from '@mui/icons-material'
import { AppDispatch, RootState } from '../../../app/store'
import { fetchCustomers } from '../redux/customer-thunks'
import { Customer } from '../types/customer.types'

const CustomersView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { customers, isLoading, error } = useSelector((state: RootState) => state.customer)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  const handleChatClick = (customerId: string) => {
    navigate(`/dashboard/chat/${customerId}`)
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Customers
      </Typography>
      
      {customers.length === 0 ? (
        <Box mt={2}>
          <Alert severity="info">No customers found.</Alert>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>WhatsApp</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer: Customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.whatsapp}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Chat">
                      <IconButton
                        onClick={() => handleChatClick(customer._id)}
                        color="primary"
                        size="small"
                      >
                        <ChatIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default CustomersView
