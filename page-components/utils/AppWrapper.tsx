import React, { useState } from 'react';

/**
 * Next-Auth
 */
import { useSession } from 'next-auth/react';

import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Switch,
} from '@mantine/core';
import {
  IconMoon,
  IconSun,
} from '@tabler/icons';

import { Navbar } from '../../components/Layout';

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

                     <Group
                        position="center"
                        my={30}
                        style={{
                           position: 'absolute',
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
                     {/* {session && (
                        <div
                           style={{
                              position: 'absolute',
                              right: 5,
                           }}>
                           <Button
                              variant="outline"
                              radius="xl"
                              onClick={(event) => {
                                 event.preventDefault()
                                 signOut({
                                    callbackUrl: 'http://localhost:3000/',
                                 })
                              }}
                              leftIcon={<IconLogout size={15} />}>
                              Logout
                           </Button>
                        </div>
                     )} */}
                  </div>
               </Header>
            }>
            {children}
         </AppShell>
      </>
   )
}

export default PageWrapper
/**
 *                            <Menu>
                              <Menu.Target>
                                 <Avatar
                                    src={session.user.image}
                                    alt={session.user.name}
                                 />
                              </Menu.Target>
                              <Menu.Dropdown>
                                 <Menu.Item icon={<IconLogout size={14} />}>
                                    Logout
                                 </Menu.Item>
                              </Menu.Dropdown>
                           </Menu>

 */
