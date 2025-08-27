import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'

interface ClearConversationModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly customerName: string;
}

const ClearConversationModal: React.FC<ClearConversationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  customerName
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Clear Conversation</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to clear the conversation with {customerName}? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Clear Conversation
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClearConversationModal
