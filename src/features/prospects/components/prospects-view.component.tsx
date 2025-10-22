import React, { useState } from 'react'
import { Box, Paper, Typography, Divider, Chip } from '@mui/material'
import { TrendingUp as TrendingUpIcon, CalendarToday as CalendarIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import ProspectsList from './prospects-list.component'
import { Prospect } from '../types/prospects.types'

const getSentimentColor = (sentiment: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
  switch (sentiment) {
    case 'positive': return 'success'
    case 'negative': return 'error'
    case 'neutral': return 'default'
    default: return 'default'
  }
}

const getSentimentLabel = (sentiment: string): string => {
  switch (sentiment) {
    case 'positive': return 'Positive'
    case 'negative': return 'Negative'
    case 'neutral': return 'Neutral'
    default: return sentiment
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatConfidence = (confidence: number): string => {
  return `${Math.round(confidence * 100)}%`
}

const ProspectsView: React.FC = () => {
  const { t } = useTranslation()
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null)

  const handleProspectSelect = (prospect: Prospect): void => {
    setSelectedProspect(prospect)
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* Prospects List Column */}
        <Box sx={{ width: { xs: '100%', md: '40%', lg: '35%' }, height: '100%' }}>
          <ProspectsList 
            selectedProspectId={selectedProspect?._id} 
            onProspectSelect={handleProspectSelect}
          />
        </Box>
        
        {/* Vertical Divider */}
        <Divider orientation="vertical" flexItem />
        
        {/* Prospect Details Column */}
        <Box sx={{ flex: 1, height: '100%' }}>
          {selectedProspect ? (
            <Paper sx={{ 
              height: '100%', 
              p: 3,
              borderRadius: 0
            }}>
              <Typography variant="h4" component="h2" gutterBottom>
                {selectedProspect.customerName}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {t('prospects.contactInformation')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body1">
                      <strong>{t('prospects.customerId')}:</strong> {selectedProspect.customerId}
                    </Typography>
                    <Typography variant="body1">
                      <strong>{t('common.phone')}:</strong> {selectedProspect.phone}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>
                    {t('prospects.prospectDetails')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1">
                        <strong>{t('prospects.sentiment')}:</strong>
                      </Typography>
                      <Chip 
                        label={getSentimentLabel(selectedProspect.sentiment)} 
                        size="small" 
                        color={getSentimentColor(selectedProspect.sentiment)}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1">
                        <strong>{t('prospects.confidence')}:</strong>
                      </Typography>
                      <Chip 
                        label={formatConfidence(selectedProspect.confidence)}
                        size="small" 
                        variant="outlined"
                        icon={<TrendingUpIcon />}
                      />
                    </Box>
                    <Typography variant="body1">
                      <strong>{t('prospects.isProspect')}:</strong> {selectedProspect.isProspect ? t('common.yes') : t('common.no')}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>
                    {t('prospects.timeline')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body1">
                      <strong>{t('prospects.prospectDate')}:</strong> {formatDate(selectedProspect.prospectDate)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ) : (
            <Paper sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: 0
            }}>
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {t('prospects.selectProspect')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('prospects.chooseProspectFromList')}
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ProspectsView
