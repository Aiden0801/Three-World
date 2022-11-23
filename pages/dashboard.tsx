import React from 'react'
import { Dashboard } from '../page-components/Dashboard'
import { PageWrapper } from '../components/MainPage'
const DashboardPage: React.FC = () => {
   return (
      <>
         <PageWrapper currentPage="dashboard">
            <Dashboard />
         </PageWrapper>
         {/* <div>hello</div> */}
      </>
   )
}

export default DashboardPage
