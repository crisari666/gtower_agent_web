
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home'
import { CustomerView } from '../pages/customer'
import { ImportCustomersPage } from '../pages/customer/import-customers'
import { ProspectsViewPage } from '../pages/prospects'
import SignInPage from '../pages/auth/signin_page'
import Dashboard from '../features/dashboard/dashboard'
import AgentView from '../pages/agent'
import MusclesPage from '../pages/muscles'
import BodyPartsPage from '../pages/body-parts'

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
      {path: 'muscles',Component: MusclesPage},
      {path: 'body-parts',Component: BodyPartsPage},
    ],
  },
])

