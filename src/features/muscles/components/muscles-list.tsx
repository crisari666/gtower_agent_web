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
import { MuscleData } from '../types/muscle.types'

interface MusclesListProps {
  muscles: MuscleData[]
  onEdit: (muscle: MuscleData) => void
  onDelete: (muscle: MuscleData) => void
}

export const MusclesList: React.FC<MusclesListProps> = ({ muscles, onEdit, onDelete }) => {
  if (muscles.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No muscles found
        </Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Spanish Name</TableCell>
            <TableCell>English Name</TableCell>
            <TableCell>Body Part</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {muscles.map((muscle, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {muscle.muscle.spanish}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {muscle.muscle.english}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={muscle.bodyPart}
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
