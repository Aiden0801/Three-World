import React from 'react'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'
import { Profile } from '@/page-components/User'

const UserProfile: React.FC = () => {
  return (
    <AppLayout currentPage="profile">
      <Profile />
    </AppLayout>
  )
}

export default UserProfile
