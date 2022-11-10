import React, { useState } from 'react'

/**
 * Next-Auth
 */
import { useSession } from 'next-auth/react'

import {
   AppShell,
   Avatar,
   Burger,
   Group,
   Header,
   Indicator,
   MediaQuery,
   Switch,
   UnstyledButton,
} from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons'

import { Navbar } from '../../components/Layout'

const PageWrapper = ({ children, currentPage }) => {
   const [opened, setOpened] = useState(false)

   const { data: session, status } = useSession()

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
               <Header height={50}>
                  <div
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        backgroundColor: '#CED4DA',
                     }}>
                     <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                           opened={opened}
                           onClick={() => setOpened((o) => !o)}
                           size="sm"
                           mr="xl"
                        />
                     </MediaQuery>

                     <Group
                        position="center"
                        my={30}
                        style={{
                           position: 'absolute',
                           right: 20,
                        }}>
                        {session && (
                           <UnstyledButton>
                              <Indicator>
                                 <Avatar
                                    size={30}
                                    src={session.user.image}
                                    alt={session.user.name}
                                 />
                              </Indicator>
                           </UnstyledButton>
                        )}
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
