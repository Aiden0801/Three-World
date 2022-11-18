import { useState } from 'react'
/**
 * Next-Auth
 */
import {
   Burger,
   Code,
   createStyles,
   Group,
   Header,
   Image,
   Indicator,
   MediaQuery,
   Text,
   TextInput,
   Title,
} from '@mantine/core'
import { IconBell, IconSearch } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import ActionToggle from './ColorSchemeToogle'
import UserAvatar from './UserAvatar'
const useStyles = createStyles((theme, _params, getRef) => {
   return {
      container: {
         backgroundColor:
            theme.colorScheme === 'dark'
               ? theme.colors.green[6]
               : theme.colors.indigo[4],
      },
      logo: {
         marginLeft: '20px',
      },
   }
})
const HeaderComponent = ({ handlenavtoogle }) => {
   const [opened, setOpened] = useState(false)
   const { data: session, status } = useSession()
   const { classes, cx } = useStyles()
   return (
      <Header height={50} className={classes.container}>
         <div
            style={{
               display: 'flex',
               alignItems: 'center',
               height: '100%',
            }}>
            <Group className={classes.logo}>
               <Image
                  src="http://localhost:3000/logo/logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
               />
               <Title color="white" order={2}>
                  3
                  <Text span size="xl" color="green" inherit>
                     World
                  </Text>
               </Title>
            </Group>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
               <Burger
                  ml="xl"
                  mr="xl"
                  color="white"
                  opened={opened}
                  onClick={() => {
                     setOpened((o) => !o)
                     handlenavtoogle()
                  }}
                  size="sm"
               />
            </MediaQuery>
            <Group
               position="center"
               my={30}
               style={{
                  position: 'absolute',
                  right: 20,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}>
               <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  <TextInput
                     placeholder="Search"
                     size="xs"
                     icon={<IconSearch size={12} stroke={1.5} />}
                     rightSectionWidth={120}
                     rightSection={<Code>Ctrl + K</Code>}
                     styles={{ rightSection: { pointerEvents: 'none' } }}
                     ml="xl"
                  />
               </MediaQuery>
               {/* {session && ( */}
               <>
                  <ActionToggle />
                  <Indicator withBorder color="pink" mt="sm">
                     <IconBell size={20} color="white" />
                  </Indicator>
                  <UserAvatar img={session.user.image} />
               </>
               {/* )} */}
            </Group>
         </div>
      </Header>
   )
}

export default HeaderComponent
