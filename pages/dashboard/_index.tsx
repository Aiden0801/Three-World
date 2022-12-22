import React from 'react'
import { Dashboard } from '@/page-components/Dashboard'
import { AppLayout } from '@/layouts/AppLayout'
const DashboardPage: React.FC = () => {
  return (
    <AppLayout currentPage="dashboard">
      <Dashboard />
    </AppLayout>
  )
}

export default DashboardPage
