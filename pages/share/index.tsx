import React from 'react'
import { Share } from '../../page-components/Share/index'
import PageWrapper from '../../page-components/utils/AppWrapper'
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
