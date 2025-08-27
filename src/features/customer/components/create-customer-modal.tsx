import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { AppDispatch } from '../../../app/store'
import { createCustomer } from '../redux/customer-thunks'
import { CreateCustomerRequest } from '../types/customer.types'

interface CreateCustomerModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { enqueueSnackbar } = useSnackbar()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof CreateCustomerRequest, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await dispatch(createCustomer(formData as CreateCustomerRequest))
      enqueueSnackbar('Customer created successfully', { variant: 'success' })
      handleClose()
    } catch (error) {
      enqueueSnackbar('Failed to create customer', { variant: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = (): void => {
    setFormData({
      name: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: ''
    })
    setErrors({})
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Customer</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            fullWidth
            label="Name *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            margin="normal"
            type="tel"
          />
          <TextField
            fullWidth
            label="WhatsApp *"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            error={!!errors.whatsapp}
            helperText={errors.whatsapp}
            margin="normal"
            type="tel"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
            margin="normal"
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Customer'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateCustomerModal
