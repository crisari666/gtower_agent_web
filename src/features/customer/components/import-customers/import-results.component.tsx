import React from 'react'
import {
  Paper,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Divider,
} from '@mui/material'
import { CheckCircle, Error, Info } from '@mui/icons-material'
import { BulkCreateCustomerResponse } from '../../services/customers-service'
import { Customer } from '../../types/customer.types'

interface ImportResultsComponentProps {
  results: BulkCreateCustomerResponse
}

export const ImportResultsComponent: React.FC<ImportResultsComponentProps> = ({
  results,
}) => {
  const { created, skipped, totalProcessed, createdCount, skippedCount } = results

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2, minWidth: 150, textAlign: 'center' }}>
          <Typography variant="h4" color="primary">
            {totalProcessed}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Processed
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 2, minWidth: 150, textAlign: 'center' }}>
          <Typography variant="h4" color="success.main">
            {createdCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 2, minWidth: 150, textAlign: 'center' }}>
          <Typography variant="h4" color="warning.main">
            {skippedCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Skipped
          </Typography>
        </Paper>
      </Box>

      {/* Created Customers */}
      {created.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CheckCircle color="success" />
            <Typography variant="h6">
              Successfully Created ({created.length})
            </Typography>
          </Box>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {created.map((customer: Customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>
                      {customer.createdAt 
                        ? new Date(customer.createdAt).toLocaleString()
                        : 'N/A'
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Skipped Customers */}
      {skipped.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Error color="warning" />
            <Typography variant="h6">
              Skipped Records ({skipped.length})
            </Typography>
          </Box>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Phone</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {skipped.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.reason}
                        color="warning"
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Success/Error Messages */}
      {createdCount > 0 && (
        <Alert severity="success" icon={<CheckCircle />}>
          Successfully imported {createdCount} customers from CSV file.
        </Alert>
      )}
      
      {skippedCount > 0 && (
        <Alert severity="warning" icon={<Error />}>
          {skippedCount} records were skipped due to validation errors or duplicates.
        </Alert>
      )}
      
      {totalProcessed === 0 && (
        <Alert severity="info" icon={<Info />}>
          No valid customer data found in the CSV file.
        </Alert>
      )}
    </Box>
  )
}
