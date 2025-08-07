
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home'
import { Page1 } from '../pages/page1'
import { Page2 } from '../pages/page2'
import { Page3 } from '../pages/page3'
import { CustomerView } from '../pages/customer'
import { AgentView } from '../pages/agent'
import SignInPage from '../pages/auth/signin_page'
import Dashboard from '../features/dashboard/dashboard'





export const router = createBrowserRouter([
  {
    path: '/',
    Component: SignInPage,
  },
  {

    path: '/dashboard',
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'page1',
        Component: Page1,
      },
      {
        path: 'page2',
        Component: Page2,
      },
      {
        path: 'page3',
        Component: Page3,
      },
      {
        path: 'customer',
        Component: CustomerView,
      },
      {
        path: 'agent',
        Component: AgentView,
      },
    ],
  },
])

