import {
   Box,
   Burger,
   Button,
   createStyles,
   Group,
   Header,
   Paper,
   Stack,
   Transition,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
const useStyles = createStyles((theme) => ({
   link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,

      [theme.fn.smallerThan('sm')]: {
         height: 42,
         display: 'flex',
         alignItems: 'center',
         width: '100%',
      },

      ...theme.fn.hover({
         backgroundColor:
            theme.colorScheme === 'dark'
               ? theme.colors.dark[6]
               : theme.colors.gray[0],
      }),
   },
   button: {},
   subLink: {
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,

      ...theme.fn.hover({
         backgroundColor:
            theme.colorScheme === 'dark'
               ? theme.colors.dark[7]
               : theme.colors.gray[0],
      }),

      '&:active': theme.activeStyles,
   },

   dropdownFooter: {
      backgroundColor:
         theme.colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
      margin: -theme.spacing.md,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
         theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[1]
      }`,
   },
   dropdown: {
      position: 'absolute',
      top: 60,
      left: 0,
      right: 0,
      zIndex: 1,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopWidth: 0,
      overflow: 'hidden',
      [theme.fn.largerThan('sm')]: {
         display: 'none',
      },
   },
   hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
         display: 'none',
      },
   },

   hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
         display: 'none',
      },
   },
}))

export default function HeaderMenu() {
   const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
      useDisclosure(false)
   const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
   const { classes, theme } = useStyles()
   const { data: session, status } = useSession()
   const router = useRouter()
   return (
      <Box
         pb={20}
         sx={(theme) => ({
            backgroundColor: 'red',
            // backgroundColor: 'rgba(255, 0, 0, 1)',
            position: 'fixed',
            width: `calc(100vw - ${theme.spacing.md * 2}px)`,
            top: 0,
            left: 0,
            zIndex: 24,
         })}>
         <Header height={60} style={{}}>
            <Group position="apart" sx={{ height: '100%' }} pl="xl">
               <Image alt="" src="/logo/Group_157.png" width={70} height={50} />

               <Group
                  sx={{ height: '100%' }}
                  spacing={0}
                  className={classes.hiddenMobile}>
                  <a href="#" className={classes.link}>
                     Home
                  </a>
                  <a href="#" className={classes.link}>
                     Features
                  </a>
                  <a href="#" className={classes.link}>
                     Pricing
                  </a>
                  <a href="#" className={classes.link}>
                     About
                  </a>
                  <a href="#" className={classes.link}>
                     Contact US
                  </a>
               </Group>

               <>
                  <Group className={classes.hiddenMobile}>
                     <Button
                        className={classes.button}
                        onClick={() => router.push('/login')}>
                        Log in
                     </Button>
                  </Group>
               </>

               <Burger
                  opened={drawerOpened}
                  onClick={toggleDrawer}
                  className={classes.hiddenDesktop}
               />

               <Transition
                  transition="pop-top-right"
                  duration={200}
                  mounted={drawerOpened}>
                  {(styles) => (
                     <Paper
                        className={classes.dropdown}
                        withBorder
                        style={styles}>
                        <Stack>
                           <a href="#" className={classes.link}>
                              Home
                           </a>
                           <a href="#" className={classes.link}>
                              Features
                           </a>
                           <a href="#" className={classes.link}>
                              Contact US
                           </a>

                           <Button
                              variant="default"
                              className={classes.button}
                              onClick={() => {
                                 router.push('/login')
                              }}>
                              Log in
                           </Button>
                        </Stack>
                     </Paper>
                  )}
               </Transition>
            </Group>
         </Header>
      </Box>
   )
}
