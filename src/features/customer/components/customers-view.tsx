import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  Tooltip,
  Button,
  Chip
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import { AppDispatch, RootState } from '../../../app/store'
import { fetchCustomers } from '../redux/customer-thunks'
import { Customer } from '../types/customer.types'
import CreateCustomerModal from './create-customer-modal'

const CustomersView: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { customers, isLoading, error } = useSelector((state: RootState) => state.customer)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])


  const handleAddCustomer = (): void => {
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = (): void => {
    setIsCreateModalOpen(false)
  }

  const handleCustomerNameClick = async (customerId: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(customerId)
      enqueueSnackbar(t('customers.customerIdCopied'), { variant: 'success' })
    } catch (err) {
      enqueueSnackbar(t('customers.failedToCopyCustomerId'), { variant: 'error' })
    }
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
        {t('customers.title')}
      </Typography>
      
      <Box mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCustomer}
        >
          {t('customers.addCustomer')}
        </Button>
      </Box>
      
      {customers.length === 0 ? (
        <Box mt={2}>
          <Alert severity="info">{t('customers.noCustomersFound')}</Alert>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('common.name')}</TableCell>
                <TableCell>{t('common.phone')}</TableCell>
                <TableCell>{t('common.whatsapp')}</TableCell>
                <TableCell>{t('common.email')}</TableCell>
                <TableCell align="center">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer: Customer) => (
                <TableRow key={customer._id}>
                  <TableCell 
                    onClick={() => handleCustomerNameClick(customer._id)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { 
                        backgroundColor: 'action.hover',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      {customer.isProspect && (
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: 'green',
                            flexShrink: 0
                          }}
                        />
                      )}
                      {customer.name}
                    </Box>
                  </TableCell>
                  <TableCell>{customer.phone || '-'}</TableCell>
                  <TableCell>{customer.whatsapp}</TableCell>
                  <TableCell>{customer.email || '-'}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      {/* Actions removed - chat functionality disabled */}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateCustomerModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </Box>
  )
}

export default CustomersView
