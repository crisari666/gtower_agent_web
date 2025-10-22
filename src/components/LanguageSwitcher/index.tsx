import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material'
import { Language as LanguageIcon } from '@mui/icons-material'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (event: any) => {
    const selectedLanguage = event.target.value
    i18n.changeLanguage(selectedLanguage)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LanguageIcon color="action" />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="en">
            <Typography variant="body2">English</Typography>
          </MenuItem>
          <MenuItem value="es">
            <Typography variant="body2">Español</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageSwitcher
