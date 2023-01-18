import React from 'react'
import { WebsitesTable } from '@/page-components/websites'
import { AppLayout } from '@/layouts/AppLayout'


const WebsitesIndexPage: React.FC = () => {
  return (
    <AppLayout currentPage="Websites">
      <WebsitesTable />
    </AppLayout>
  )
}

export default WebsitesIndexPage
