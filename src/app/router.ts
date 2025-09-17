
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home'
import { CustomerView } from '../pages/customer'
import { ImportCustomersPage } from '../pages/customer/import-customers'
import { ProspectsViewPage } from '../pages/prospects'
import SignInPage from '../pages/auth/signin_page'
import Dashboard from '../features/dashboard/dashboard'
import AgentView from '../pages/agent'
import ChatView from '../features/chats/components/chat-view.component'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SignInPage,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
    children: [
      {index: true,Component: Home} ,
      {path: 'customer',Component: CustomerView},
      {path: 'customer/import',Component: ImportCustomersPage},
      {path: 'prospects',Component: ProspectsViewPage,},
      {path: 'agent',Component: AgentView},
      {path: 'chat', Component: ChatView},
      {path: 'chat/:customerId', Component: ChatView},
    ],
  },
])

