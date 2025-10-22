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
  Switch,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { BodyPart } from '../types/body-part.types'

interface BodyPartsListProps {
  bodyParts: BodyPart[]
  onEdit: (bodyPart: BodyPart) => void
  onDelete: (bodyPart: BodyPart) => void
  onToggleActive: (bodyPart: BodyPart) => void
}

export const BodyPartsList: React.FC<BodyPartsListProps> = ({ 
  bodyParts, 
  onEdit, 
  onDelete, 
  onToggleActive 
}) => {
  const { t } = useTranslation()
  if (bodyParts.length === 0) {
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
            <TableCell>{t('bodyParts.nameEnglish')}</TableCell>
            <TableCell>{t('common.description')}</TableCell>
            <TableCell align="center">{t('common.status')}</TableCell>
            <TableCell align="center">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyParts.map((bodyPart, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {bodyPart.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {bodyPart.nameEnglish}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }}>
                  {bodyPart.description}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={bodyPart.isActive ? t('common.active') : t('common.inactive')}
                  size="small"
                  color={bodyPart.isActive ? 'success' : 'default'}
                  variant={bodyPart.isActive ? 'filled' : 'outlined'}
                />
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={bodyPart.isActive}
                  onChange={() => onToggleActive(bodyPart)}
                  size="small"
                  color="primary"
                />
                <IconButton
                  size="small"
                  onClick={() => onEdit(bodyPart)}
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(bodyPart)}
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
