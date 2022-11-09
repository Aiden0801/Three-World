import React, { useState } from 'react'
import { SessionControl } from '../../page-components/SessionControl'
import { Layout, Navbar } from '../../components/Layout'
import { Grid, AppShell, MediaQuery, Burger, Text, Header } from '@mantine/core'
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
