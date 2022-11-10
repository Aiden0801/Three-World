import React from 'react'
import { BrowserControl } from '../../page-components/Browser'
import PageWrapper from '../../components/MainPage/PageWrapper'
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
