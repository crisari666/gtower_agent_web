import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setFilters } from '../redux/muscles-slice'

export const MusclesFilter: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = () => {
    dispatch(setFilters({ bodyPart: searchTerm || undefined }))
  }

  return (
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
  )
}
