import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { Home } from '../pages/home'
import { Page1 } from '../pages/page1'
import { Page2 } from '../pages/page2'
import { Page3 } from '../pages/page3'
import { CustomerView } from '../pages/customer'
import { ImportCustomersPage } from '../pages/customer/import-customers'
import AgentView from '../pages/agent'
import SignInPage from '../pages/auth/signin_page'
import { Nav } from '../components/Nav'
import { ProtectedRoute } from '../components/ProtectedRoute'

export const APP_ROUTES = {
  home: '/',
  page1: '/page1',
  page2: '/page2',
  page3: '/page3',
  customer: '/customer',
  importCustomers: '/customer/import',
  agent: '/agent',
  signin: '/signin',
} as const

export type AppRouteKey = keyof typeof APP_ROUTES

function RootLayout() {
  return (
    <div className="App">
      <main>
        <ProtectedRoute>
          <Nav />
          <Outlet />
        </ProtectedRoute>
      </main>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/signin',
    Component: SignInPage,
  },
  {
    path: '/',
    Component: RootLayout,
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
        path: 'customer/import',
        Component: ImportCustomersPage,
      },
      {
        path: 'agent',
        Component: AgentView,
      },
    ],
  },
])

