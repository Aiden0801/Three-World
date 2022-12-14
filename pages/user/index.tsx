import React from 'react'
import { PublicLayout } from '@/layouts/PublicLayout'
import { User } from '@/page-components/User'

const UserPage: React.FC = () => {
  return (
    <PublicLayout>
      <User />
    </PublicLayout>
  )
}

export default UserPage
