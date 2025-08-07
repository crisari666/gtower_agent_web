import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AgentState {
  readonly id: string | null;
  readonly displayName: string | null;
  readonly isOnline: boolean;
}

const initialState: AgentState = {
  id: null,
  displayName: null,
  isOnline: false,
}

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgent: (state, action: PayloadAction<{ id: string; displayName: string }>) => {
      state.id = action.payload.id
      state.displayName = action.payload.displayName
    },
    setAgentOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload
    },
    clearAgent: (state) => {
      state.id = null
      state.displayName = null
      state.isOnline = false
    },
  },
})

export const { setAgent, setAgentOnline, clearAgent } = agentSlice.actions

export default agentSlice.reducer


