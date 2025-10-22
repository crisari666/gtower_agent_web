import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { fetchBodyParts, deleteBodyPart, updateBodyPart, openCreateModal, openEditModal } from '../redux/body-parts-slice'
import { BodyPartsList } from './body-parts-list'
import { BodyPartModal } from './body-part-modal'
import { BodyPartsFilter } from './body-parts-filter'
import { BodyPart } from '../types/body-part.types'

export const BodyPartsView: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { bodyParts, status, error, filters, isModalOpen, modalMode, selectedBodyPart } = useSelector(
    (state: RootState) => state.bodyParts
  )

  useEffect(() => {
    dispatch(fetchBodyParts(filters) as any)
  }, [dispatch, filters])

  const handleCreateClick = () => {
    dispatch(openCreateModal())
  }

  const handleEditClick = (bodyPart: BodyPart) => {
    dispatch(openEditModal(bodyPart))
  }

  const handleDeleteClick = async (bodyPart: BodyPart) => {
    if (window.confirm(t('bodyParts.deleteConfirm'))) {
      await dispatch(deleteBodyPart(bodyPart as any) as any)
    }
  }

  const handleToggleActive = async (bodyPart: BodyPart) => {
    await dispatch(updateBodyPart({ 
      id: bodyPart as any, 
      data: { isActive: !bodyPart.isActive } 
    }) as any)
  }

  const handleModalClose = () => {
    dispatch({ type: 'bodyParts/closeModal' })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('bodyParts.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          size="large"
        >
          {t('bodyParts.addBodyPart')}
        </Button>
      </Box>

      <BodyPartsFilter />

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {status === 'idle' && (
        <BodyPartsList
          bodyParts={bodyParts}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onToggleActive={handleToggleActive}
        />
      )}

      <BodyPartModal
        open={isModalOpen}
        mode={modalMode}
        bodyPart={selectedBodyPart}
        onClose={handleModalClose}
      />
    </Box>
  )
}
