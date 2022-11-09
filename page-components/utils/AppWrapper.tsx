import React, { useState } from 'react'
import { SessionControl } from '../../page-components/SessionControl'
import { Layout, Navbar } from '../../components/Layout'
import { Grid, AppShell, MediaQuery, Burger, Text, Header } from '@mantine/core'
const PageWrapper = ({ children }) => {
   const [opened, setOpened] = useState(false)

   return (
      <>
         <AppShell
            padding={0}
            navbar={
               <Navbar
                  hidden={!opened}
                  hiddenBreakpoint="sm"
                  width={{ sm: 300, lg: 400 }}
                  initialState={'sessions'}
               />
            }
            header={
               <Header height={40}>
                  <div
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                     }}>
                     <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                           opened={opened}
                           onClick={() => setOpened((o) => !o)}
                           size="sm"
                           mr="xl"
                        />
                     </MediaQuery>
                     <Text>Application header</Text>
                  </div>
               </Header>
            }>
            {children}
         </AppShell>
      </>
   )
}

export default PageWrapper
