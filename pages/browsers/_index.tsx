import React from 'react'
import { BrowserControl } from '@/page-components/Browser'
import { AppLayout } from '@/layouts/AppLayout'
const BrowserPage: React.FC = () => {
  return (
    <AppLayout currentPage="browsers">
      <BrowserControl />
    </AppLayout>
  )
}

export default BrowserPage
