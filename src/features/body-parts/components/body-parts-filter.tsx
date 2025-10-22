import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setFilters } from '../redux/body-parts-slice'

export const BodyPartsFilter: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

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

  return (
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
  )
}
