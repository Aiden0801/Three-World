import React from 'react'
import { Share } from '@/page-components/Share/index'
import { AppLayout } from '@/layouts/AppLayout'
const SharePage: React.FC = () => {
  return (
    <AppLayout currentPage="share">
      <Share />
    </AppLayout>
  )
}

export default SharePage
