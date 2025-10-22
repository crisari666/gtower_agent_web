import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { createMuscle, updateMuscle } from '../redux/muscles-thunks'
import { closeModal } from '../redux/muscles-slice'
import { MuscleData } from '../types/muscle.types'

interface MuscleModalProps {
  open: boolean
  mode: 'create' | 'edit'
  muscle?: MuscleData | null
  onClose: () => void
}

export const MuscleModal: React.FC<MuscleModalProps> = ({ open, mode, muscle, onClose }) => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: RootState) => state.muscles)
  
  const [formData, setFormData] = useState({
    spanish: '',
    english: '',
    bodyPart: '',
  })

  useEffect(() => {
    if (mode === 'edit' && muscle) {
      setFormData({
        spanish: muscle.muscle.spanish,
        english: muscle.muscle.english,
        bodyPart: muscle.bodyPart,
      })
    } else {
      setFormData({
        spanish: '',
        english: '',
        bodyPart: '',
      })
    }
  }, [mode, muscle, open])

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.spanish || !formData.english || !formData.bodyPart) {
      return
    }

    const muscleData = {
      muscle: {
        spanish: formData.spanish,
        english: formData.english,
      },
      bodyPart: formData.bodyPart,
    }

    if (mode === 'create') {
      await dispatch(createMuscle(muscleData) as any)
    } else if (mode === 'edit' && muscle) {
      await dispatch(updateMuscle({ id: muscle as any, data: muscleData }) as any)
    }

    onClose()
  }

  const handleClose = () => {
    setFormData({
      spanish: '',
      english: '',
      bodyPart: '',
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'create' ? 'Create New Muscle' : 'Edit Muscle'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Spanish Name"
            value={formData.spanish}
            onChange={handleInputChange('spanish')}
            fullWidth
            required
          />
          <TextField
            label="English Name"
            value={formData.english}
            onChange={handleInputChange('english')}
            fullWidth
            required
          />
          <TextField
            label="Body Part"
            value={formData.bodyPart}
            onChange={handleInputChange('bodyPart')}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={status === 'loading'}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={status === 'loading' || !formData.spanish || !formData.english || !formData.bodyPart}
        >
          {status === 'loading' ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
