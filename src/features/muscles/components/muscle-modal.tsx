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
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { createMuscle, updateMuscle, closeModal } from '../redux/muscles-slice'
import { Muscle } from '../types/muscle.types'

interface MuscleModalProps {
  open: boolean
  mode: 'create' | 'edit'
  muscle?: Muscle | null
  onClose: () => void
}

export const MuscleModal: React.FC<MuscleModalProps> = ({ open, mode, muscle, onClose }) => {
  const { t } = useTranslation()
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
        spanish: muscle.name,
        english: muscle.nameEnglish,
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
      name: formData.spanish,
      nameEnglish: formData.english,
      bodyPart: formData.bodyPart,
    }

    if (mode === 'create') {
      await dispatch(createMuscle(muscleData) as any)
    } else if (mode === 'edit' && muscle) {
      await dispatch(updateMuscle({ id: muscle._id, data: muscleData }) as any)
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
        {mode === 'create' ? t('muscles.createTitle') : t('muscles.editTitle')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label={t('common.name')}
            value={formData.spanish}
            onChange={handleInputChange('spanish')}
            fullWidth
            required
          />
          <TextField
            label={t('muscles.nameEnglish')}
            value={formData.english}
            onChange={handleInputChange('english')}
            fullWidth
            required
          />
          <TextField
            label={t('muscles.bodyPart')}
            value={formData.bodyPart}
            onChange={handleInputChange('bodyPart')}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={status === 'loading'}>
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={status === 'loading' || !formData.spanish || !formData.english || !formData.bodyPart}
        >
          {status === 'loading' ? t('common.loading') : mode === 'create' ? t('common.create') : t('common.update')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
