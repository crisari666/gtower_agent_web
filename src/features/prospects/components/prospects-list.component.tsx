import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  ListItemButton,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Phone as PhoneIcon, TrendingUp as TrendingUpIcon, CalendarToday as CalendarIcon } from '@mui/icons-material'
import { AppDispatch, RootState } from '../../../app/store'
import { fetchProspects } from '../redux/prospects-thunks'
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

interface ProspectsListProps {
  readonly selectedProspectId?: string;
  readonly onProspectSelect?: (prospect: Prospect) => void;
}

const ProspectsList: React.FC<ProspectsListProps> = ({ selectedProspectId, onProspectSelect }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { prospects, isLoading, error } = useSelector((state: RootState) => state.prospects)

  useEffect(() => {
    if (prospects.length === 0) {
      dispatch(fetchProspects())
    }
  }, [dispatch, prospects.length])

  const handleProspectClick = (prospect: Prospect): void => {
    if (onProspectSelect) {
      onProspectSelect(prospect)
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (prospects.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No prospects found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start by adding your first prospect
        </Typography>
      </Box>
    )
  }

  return (
    <Paper sx={{ height: '100%', borderRadius: 0 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h2">
          Prospects ({prospects.length})
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {prospects.map((prospect, index) => (
          <React.Fragment key={prospect._id}>
            <ListItemButton 
              selected={selectedProspectId === prospect._id}
              onClick={() => handleProspectClick(prospect)}
              sx={{ 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
                        {prospect.customerName}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          {prospect.phone && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <PhoneIcon fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                {prospect.phone}
                              </Typography>
                            </Box>
                          )}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(prospect.prospectDate)}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                          <Chip 
                            label={getSentimentLabel(prospect.sentiment)} 
                            size="small" 
                            color={getSentimentColor(prospect.sentiment)}
                          />
                          <Chip 
                            label={`Confidence: ${formatConfidence(prospect.confidence)}`}
                            size="small" 
                            variant="outlined"
                            icon={<TrendingUpIcon />}
                          />
                          {prospect.isProspect && (
                            <Chip 
                              label="Prospect" 
                              size="small" 
                              color="primary"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </Box>
                <ListItemSecondaryAction>
                  <IconButton size="small" sx={{ mr: 0.5 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </Box>
            </ListItemButton>
            {index < prospects.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  )
}

export default ProspectsList
