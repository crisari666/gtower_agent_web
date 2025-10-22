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
  FormControlLabel,
  Switch,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { createBodyPart, updateBodyPart } from '../redux/body-parts-slice'
import { BodyPart } from '../types/body-part.types'

interface BodyPartModalProps {
  open: boolean
  mode: 'create' | 'edit'
  bodyPart?: BodyPart | null
  onClose: () => void
}

export const BodyPartModal: React.FC<BodyPartModalProps> = ({ open, mode, bodyPart, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { status } = useSelector((state: RootState) => state.bodyParts)
  
  const [formData, setFormData] = useState({
    name: '',
    nameEnglish: '',
    description: '',
    isActive: true,
  })

  useEffect(() => {
    if (mode === 'edit' && bodyPart) {
      setFormData({
        name: bodyPart.name,
        nameEnglish: bodyPart.nameEnglish,
        description: bodyPart.description,
        isActive: bodyPart.isActive,
      })
    } else {
      setFormData({
        name: '',
        nameEnglish: '',
        description: '',
        isActive: true,
      })
    }
  }, [mode, bodyPart, open])

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.nameEnglish || !formData.description) {
      return
    }

    const bodyPartData = {
      name: formData.name,
      nameEnglish: formData.nameEnglish,
      description: formData.description,
      isActive: formData.isActive,
    }

    if (mode === 'create') {
      await dispatch(createBodyPart(bodyPartData) as any)
    } else if (mode === 'edit' && bodyPart) {
      await dispatch(updateBodyPart({ id: bodyPart as any, data: bodyPartData }) as any)
    }

    onClose()
  }

  const handleClose = () => {
    setFormData({
      name: '',
      nameEnglish: '',
      description: '',
      isActive: true,
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'create' ? t('bodyParts.createTitle') : t('bodyParts.editTitle')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label={t('common.name')}
            value={formData.name}
            onChange={handleInputChange('name')}
            fullWidth
            required
          />
          <TextField
            label={t('bodyParts.nameEnglish')}
            value={formData.nameEnglish}
            onChange={handleInputChange('nameEnglish')}
            fullWidth
            required
          />
          <TextField
            label={t('common.description')}
            value={formData.description}
            onChange={handleInputChange('description')}
            fullWidth
            multiline
            rows={3}
            required
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={handleSwitchChange('isActive')}
                color="primary"
              />
            }
            label={t('common.active')}
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
          disabled={status === 'loading' || !formData.name || !formData.nameEnglish || !formData.description}
        >
          {status === 'loading' ? t('common.loading') : mode === 'create' ? t('common.create') : t('common.update')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
