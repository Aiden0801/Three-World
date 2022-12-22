import React from 'react'
import { SessionControl } from '@/page-components/SessionControl'
import { AppLayout } from '@/layouts/AppLayout'
const SessionPage = () => {
  return (
    <AppLayout currentPage="sessions">
      <SessionControl />
    </AppLayout>
  )
}

export default SessionPage
