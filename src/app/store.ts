import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import customerReducer from '../features/customer/redux/customer-slice'
import agentReducer from '../features/agent/agent-slice'
import chatReducer from '../features/chats/redux/chat-slice'
import prospectsReducer from '../features/prospects/redux/prospects-slice'
import authReducer from '../features/auth/redux/auth-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customer: customerReducer,
    agent: agentReducer,
    chat: chatReducer,
    prospects: prospectsReducer,
    auth: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
