import React from 'react'
import { BrowserControl } from '../../page-components/Browser'
import PageWrapper from '../../page-components/utils/AppWrapper'
const BrowserPage: React.FC = () => {
   return (
      <>
         <PageWrapper currentPage="browsers">
            <BrowserControl />
         </PageWrapper>
      </>
   )
}

export default BrowserPage
