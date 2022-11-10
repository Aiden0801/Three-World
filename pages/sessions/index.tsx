import React from 'react'
import { SessionControl } from '../../page-components/SessionControl'
import PageWrapper from '../../components/MainPage/PageWrapper'
const SessionPage = () => {
   return (
      <>
         <PageWrapper currentPage="sessions">
            <SessionControl />
         </PageWrapper>
      </>
   )
}

export default SessionPage
