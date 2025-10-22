import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { fetchMuscles, deleteMuscle, openCreateModal, openEditModal, setFilters } from '../redux/muscles-slice'
import { fetchBodyParts } from '../../body-parts/redux/body-parts-slice'
import { MusclesList } from './muscles-list'
import { MuscleModal } from './muscle-modal'
import { Muscle } from '../types/muscle.types'

export const MusclesView: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { muscles, status, error, filters, isModalOpen, modalMode, selectedMuscle } = useSelector(
    (state: RootState) => state.muscles
  )
  const { bodyParts } = useSelector((state: RootState) => state.bodyParts)

  const [searchTerm, setSearchTerm] = useState('')

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = () => {
    dispatch(setFilters({ bodyPart: searchTerm || undefined }))
  }

  const handleFetchBodyParts = () => {
    dispatch(fetchBodyParts() as any)
  }

  const filteredMuscles = muscles.filter(muscle =>
    muscle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    muscle.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    muscle.bodyPart.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                placeholder={t('muscles.searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Button
                variant="outlined"
                onClick={handleSearchSubmit}
                fullWidth
                sx={{ height: '56px' }}
              >
                {t('common.search')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
          muscles={filteredMuscles}
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
