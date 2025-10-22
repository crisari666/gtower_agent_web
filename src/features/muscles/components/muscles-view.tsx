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
import { fetchMuscles, deleteMuscle, openCreateModal, openEditModal } from '../redux/muscles-slice'
import { fetchBodyParts } from '../../body-parts/redux/body-parts-slice'
import { MusclesList } from './muscles-list'
import { MuscleModal } from './muscle-modal'
import { MusclesFilter } from './muscles-filter'
import { Muscle } from '../types/muscle.types'

export const MusclesView: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { muscles, status, error, filters, isModalOpen, modalMode, selectedMuscle } = useSelector(
    (state: RootState) => state.muscles
  )
  const { bodyParts } = useSelector((state: RootState) => state.bodyParts)

  useEffect(() => {
    dispatch(fetchMuscles(filters) as any)
  }, [dispatch, filters])

  useEffect(() => {
    // Fetch body parts if not already loaded
    if (bodyParts.length === 0) {
      dispatch(fetchBodyParts() as any)
    }
  }, [dispatch, bodyParts.length])

  const handleCreateClick = () => {
    dispatch(openCreateModal())
  }

  const handleEditClick = (muscle: Muscle) => {
    dispatch(openEditModal(muscle))
  }

  const handleDeleteClick = async (muscle: Muscle) => {
    if (window.confirm(t('muscles.deleteConfirm'))) {
      await dispatch(deleteMuscle(muscle as any) as any)
    }
  }

  const handleModalClose = () => {
    dispatch({ type: 'muscles/closeModal' })
  }

  const handleFetchBodyParts = () => {
    dispatch(fetchBodyParts() as any)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('muscles.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          size="large"
        >
          {t('muscles.addMuscle')}
        </Button>
      </Box>

      <MusclesFilter />

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
        <MusclesList
          muscles={muscles}
          bodyParts={bodyParts}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onFetchBodyParts={handleFetchBodyParts}
        />
      )}

      <MuscleModal
        open={isModalOpen}
        mode={modalMode}
        muscle={selectedMuscle}
        onClose={handleModalClose}
      />
    </Box>
  )
}
