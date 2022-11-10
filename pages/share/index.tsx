import React from 'react'
import { Share } from '../../page-components/Share/index'
import PageWrapper from '../../components/MainPage/PageWrapper'
const SharePage: React.FC = () => {
   return (
      <>
         <PageWrapper currentPage="share">
            <Share></Share>
         </PageWrapper>
      </>
   )
}

export default SharePage
