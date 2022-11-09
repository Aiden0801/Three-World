import React from 'react'
import { Share } from '../../page-components/Share/index'
import { Navbar } from '../../components/Layout'
import { Grid } from '@mantine/core'
import PageWrapper from '../../page-components/utils/AppWrapper'
const SharePage: React.FC = () => {
   return (
      <>
         <PageWrapper>
            <Share></Share>
         </PageWrapper>
      </>
   )
}

export default SharePage
