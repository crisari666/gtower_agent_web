import React, { useRef, useState } from 'react'
import { Button, Paper, Typography, Box, Alert } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { BulkCustomerData } from '../../services/customers-service'

interface CsvUploadComponentProps {
  onFileProcessed: (customers: BulkCustomerData[]) => void
  onError: (error: string) => void
}

export const CsvUploadComponent: React.FC<CsvUploadComponentProps> = ({
  onFileProcessed,
  onError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const parseCsvFile = (file: File): Promise<BulkCustomerData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string
          const lines = text.split('\n').filter(line => line.trim())
          
          if (lines.length < 2) {
            reject(new Error('CSV file must contain at least a header and one data row'))
            return
          }

          const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
          const requiredHeaders = ['name', 'phone', 'country']
          
          const missingHeaders = requiredHeaders.filter(header => 
            !headers.includes(header)
          )
          
          if (missingHeaders.length > 0) {
            reject(new Error(`Missing required headers: ${missingHeaders.join(', ')}`))
            return
          }

          const customers: BulkCustomerData[] = []
          
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim())
            
            if (values.length !== headers.length) {
              continue // Skip malformed rows
            }

            const customer: BulkCustomerData = {
              name: values[headers.indexOf('name')] || '',
              phone: values[headers.indexOf('phone')] || '',
              country: values[headers.indexOf('country')] || '',
            }

            // Validate required fields
            if (customer.name && customer.phone && customer.country) {
              customers.push(customer)
            }
          }

          if (customers.length === 0) {
            reject(new Error('No valid customer data found in CSV file'))
            return
          }

          resolve(customers)
        } catch (error) {
          reject(new Error('Failed to parse CSV file'))
        }
      }

      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }

      reader.readAsText(file)
    })
  }

  const handleFileSelect = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      onError('Please select a CSV file')
      return
    }

    setIsProcessing(true)
    
    try {
      const customers = await parseCsvFile(file)
      onFileProcessed(customers)
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to process file')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        textAlign: 'center',
        border: isDragOver ? '2px dashed #1976d2' : '2px dashed #e0e0e0',
        backgroundColor: isDragOver ? '#f5f5f5' : 'white',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleUploadClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        disabled={isProcessing}
      />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main' }} />
        
        <Typography variant="h6" component="div">
          {isProcessing ? 'Processing CSV...' : 'Upload CSV File'}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          Drag and drop your CSV file here, or click to browse
        </Typography>
        
        <Typography variant="caption" color="text.secondary">
          Required columns: name, phone, country
        </Typography>
        
        <Button
          variant="contained"
          disabled={isProcessing}
          sx={{ mt: 1 }}
        >
          {isProcessing ? 'Processing...' : 'Select File'}
        </Button>
      </Box>
    </Paper>
  )
}
