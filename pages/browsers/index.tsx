import React from 'react'
import { BrowserControl } from '../../page-components/Browser'
import { Layout, Navbar } from '../../components/Layout'
import { Grid, SimpleGrid } from '@mantine/core'
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
