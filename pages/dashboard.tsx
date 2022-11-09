import React from 'react'
import { Dashboard } from '../page-components/Dashboard'
import { Navbar } from '../components/Layout'
import { Grid } from '@mantine/core'
import PageWrapper from '../page-components/utils/AppWrapper'
const DashboardPage: React.FC = () => {
   return (
      <>
         <PageWrapper currentPage="dashboard">
            <Dashboard />
         </PageWrapper>
      </>
   )
}

export default DashboardPage
