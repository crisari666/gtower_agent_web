import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { Muscle } from '../types/muscle.types'
import { BodyPart } from '../../body-parts/types/body-part.types'

interface MusclesListProps {
  muscles: Muscle[]
  bodyParts: BodyPart[]
  onEdit: (muscle: Muscle) => void
  onDelete: (muscle: Muscle) => void
  onFetchBodyParts?: () => void
}

export const MusclesList: React.FC<MusclesListProps> = ({ muscles, bodyParts, onEdit, onDelete, onFetchBodyParts }) => {
  const { t } = useTranslation()
  // Function to resolve body part name
  const getBodyPartName = (bodyPartId: string): string => {
    const bodyPart = bodyParts.find(bp => bp.name === bodyPartId || bp.nameEnglish === bodyPartId)
    if (bodyPart) {
      return bodyPart.nameEnglish || bodyPart.name
    }
    
    // If body part not found and we have a fetch function, trigger it
    if (onFetchBodyParts && bodyParts.length === 0) {
      onFetchBodyParts()
    }
    
    return bodyPartId // Fallback to the original ID
  }
  if (muscles.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {t('common.noDataFound')}
        </Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('common.name')}</TableCell>
            <TableCell>{t('muscles.nameEnglish')}</TableCell>
            <TableCell>{t('muscles.bodyPart')}</TableCell>
            <TableCell align="center">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {muscles.map((muscle, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {muscle.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {muscle.nameEnglish}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getBodyPartName(muscle.bodyPart)}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  onClick={() => onEdit(muscle)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(muscle)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
