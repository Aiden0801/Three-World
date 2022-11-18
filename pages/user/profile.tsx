import React from 'react'
import PageWrapper from '../../components/MainPage/PageWrapper'
import { Profile } from '../../page-components/User'
const UserProfile: React.FC = () => {
   return (
      <>
         <PageWrapper currentPage="profile">
            <Profile />
         </PageWrapper>
      </>
   )
}

export default UserProfile
