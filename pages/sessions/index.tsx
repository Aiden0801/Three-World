import React from 'react'
import { SessionControl } from '../../page-components/SessionControl'
import PageWrapper from '../../page-components/utils/AppWrapper'
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
