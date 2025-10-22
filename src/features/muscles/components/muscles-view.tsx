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
import { RootState } from '../../../app/store'
import { fetchMuscles, deleteMuscle } from '../redux/muscles-thunks'
import { openCreateModal, openEditModal, setFilters } from '../redux/muscles-slice'
import { MusclesList } from './muscles-list'
import { MuscleModal } from './muscle-modal'
import { MuscleData } from '../types/muscle.types'

export const MusclesView: React.FC = () => {
  const dispatch = useDispatch()
  const { muscles, status, error, filters, isModalOpen, modalMode, selectedMuscle } = useSelector(
    (state: RootState) => state.muscles
  )

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchMuscles(filters) as any)
  }, [dispatch, filters])

  const handleCreateClick = () => {
    dispatch(openCreateModal())
  }

  const handleEditClick = (muscle: MuscleData) => {
    dispatch(openEditModal(muscle))
  }

  const handleDeleteClick = async (muscle: MuscleData) => {
    if (window.confirm('Are you sure you want to delete this muscle?')) {
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

  const filteredMuscles = muscles.filter(muscle =>
    muscle.muscle.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    muscle.muscle.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    muscle.bodyPart.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Muscles Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          size="large"
        >
          Add Muscle
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                placeholder="Search muscles by name or body part..."
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
                Search
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
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
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
