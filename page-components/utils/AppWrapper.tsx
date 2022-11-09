import React, { useState } from 'react'
import { SessionControl } from '../../page-components/SessionControl'
import { Layout, Navbar } from '../../components/Layout'
import {
   Grid,
   AppShell,
   MediaQuery,
   Burger,
   Text,
   Header,
   Group,
   Center,
   Box,
   SegmentedControl,
   Switch,
} from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons'
const PageWrapper = ({ children, currentPage }) => {
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
                  initialState={currentPage}
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

                     <Group
                        position="center"
                        my={30}
                        style={{
                           position: 'absolute',
                           right: 2,
                        }}>
                        <Switch
                           // checked={colorScheme === 'dark'}
                           // onChange={() => toggleColorScheme()}
                           size="lg"
                           onLabel={
                              <IconSun
                                 // color={theme.white}
                                 size={20}
                                 stroke={1.5}
                              />
                           }
                           offLabel={
                              <IconMoon
                                 // color={theme.colors.gray[6]}
                                 size={20}
                                 stroke={1.5}
                              />
                           }
                        />
                     </Group>
                  </div>
               </Header>
            }>
            {children}
         </AppShell>
      </>
   )
}

export default PageWrapper
