import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
} from '@mui/material'
import { CsvUploadComponent } from './csv-upload.component'
import { ImportResultsComponent } from './import-results.component'
import { BulkCustomerData, BulkCreateCustomerResponse, CustomersService } from '../../services/customers-service'

const steps = ['Upload CSV', 'Review Data', 'Import Results']

export const ImportCustomersViewComponent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [customers, setCustomers] = useState<BulkCustomerData[]>([])
  const [importResults, setImportResults] = useState<BulkCreateCustomerResponse | null>(null)
  const [error, setError] = useState<string>('')
  const [isImporting, setIsImporting] = useState(false)

  const customersService = CustomersService.getInstance()

  const handleFileProcessed = (processedCustomers: BulkCustomerData[]) => {
    setCustomers(processedCustomers)
    setError('')
    setActiveStep(1)
  }

  const handleFileError = (errorMessage: string) => {
    setError(errorMessage)
    setActiveStep(0)
  }

  const handleImportCustomers = async () => {
    if (customers.length === 0) {
      setError('No customers to import')
      return
    }

    setIsImporting(true)
    setError('')

    try {
      const results = await customersService.createBulkCustomers({
        customers,
      })
      
      setImportResults(results)
      setActiveStep(2)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import customers')
    } finally {
      setIsImporting(false)
    }
  }

  const handleReset = () => {
    setActiveStep(0)
    setCustomers([])
    setImportResults(null)
    setError('')
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <CsvUploadComponent
            onFileProcessed={handleFileProcessed}
            onError={handleFileError}
          />
        )
      
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Review Customer Data
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Found {customers.length} customers ready to import. Review the data below and click &quot;Import Customers&quot; to proceed.
              </Typography>
              
              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>
                        Name
                      </th>
                      <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>
                        Phone
                      </th>
                      <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>
                        Country
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr key={index}>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                          {customer.name}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                          {customer.phone}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                          {customer.country}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Paper>
          </Box>
        )
      
      case 2:
        return importResults ? (
          <ImportResultsComponent results={importResults} />
        ) : null
      
      default:
        return null
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Import Customers from CSV
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload a CSV file containing customer data to import multiple customers at once.
        The CSV file should include columns for name, phone, and country.
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        {renderStepContent()}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {activeStep === 1 && (
            <Button
              variant="contained"
              onClick={handleImportCustomers}
              disabled={isImporting || customers.length === 0}
            >
              {isImporting ? 'Importing...' : 'Import Customers'}
            </Button>
          )}
          
          {activeStep === 2 && (
            <Button
              variant="contained"
              onClick={handleReset}
            >
              Import More Customers
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
