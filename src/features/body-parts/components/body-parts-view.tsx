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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { fetchBodyParts, deleteBodyPart, updateBodyPart, openCreateModal, openEditModal, setFilters } from '../redux/body-parts-slice'
import { BodyPartsList } from './body-parts-list'
import { BodyPartModal } from './body-part-modal'
import { BodyPart } from '../types/body-part.types'

export const BodyPartsView: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { bodyParts, status, error, filters, isModalOpen, modalMode, selectedBodyPart } = useSelector(
    (state: RootState) => state.bodyParts
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleStatusFilterChange = (event: any) => {
    setStatusFilter(event.target.value)
  }

  const handleSearchSubmit = () => {
    const newFilters: any = {}
    if (searchTerm) {
      newFilters.name = searchTerm
    }
    if (statusFilter !== 'all') {
      newFilters.active = statusFilter === 'active'
    }
    dispatch(setFilters(newFilters))
  }

  const filteredBodyParts = bodyParts.filter(bodyPart =>
    bodyPart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bodyPart.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bodyPart.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder={t('bodyParts.searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>{t('common.status')}</InputLabel>
                <Select
                  value={statusFilter}
                  label={t('common.status')}
                  onChange={handleStatusFilterChange}
                >
                  <MenuItem value="all">{t('common.all')}</MenuItem>
                  <MenuItem value="active">{t('common.active')}</MenuItem>
                  <MenuItem value="inactive">{t('common.inactive')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
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
        <BodyPartsList
          bodyParts={filteredBodyParts}
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
