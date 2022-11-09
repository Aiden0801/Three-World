import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createStyles, Container, Text, Button, Group } from '@mantine/core'
import { GithubIcon } from '@mantine/ds'
import React from 'react'

const BREAKPOINT = '@media (max-width: 755px)'

const useStyles = createStyles((theme) => ({
   wrapper: {
      position: 'relative',
      boxSizing: 'border-box',
      backgroundColor: 'blue',
      // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
   },

   inner: {
      position: 'relative',
      paddingTop: 200,
      paddingBottom: 120,

      [BREAKPOINT]: {
         paddingBottom: 80,
         paddingTop: 80,
      },
   },

   title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 62,
      fontWeight: 900,
      lineHeight: 1.1,
      margin: 0,
      padding: 0,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [BREAKPOINT]: {
         fontSize: 42,
         lineHeight: 1.2,
      },
   },

   description: {
      marginTop: theme.spacing.xl,
      fontSize: 24,

      [BREAKPOINT]: {
         fontSize: 18,
      },
   },

   controls: {
      marginTop: theme.spacing.xl * 2,

      [BREAKPOINT]: {
         marginTop: theme.spacing.xl,
      },
   },

   control: {
      height: 54,
      paddingLeft: 38,
      paddingRight: 38,

      [BREAKPOINT]: {
         height: 54,
         paddingLeft: 18,
         paddingRight: 18,
         flex: 1,
      },
   },
}))

const Index: React.FC = () => {
   const { classes } = useStyles()

   const router = useRouter()
   const { data: session, status } = useSession()

   useEffect(() => {
      console.log('index', status)
      if (status == 'authenticated') {
         console.log('rouing')
         router.push('./dashboard')
      }
   }, [status])
   return (
      <div>
         <Container size={700} className={classes.inner}>
            <h1 className={classes.title}>
               A{' '}
               <Text
                  component="span"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  inherit>
                  fully featured
               </Text>{' '}
               Communication World
            </h1>

            <Text className={classes.description} color="dimmed">
               Feel free to communicate each other - sharing computer browsers.
            </Text>

            <Group className={classes.controls}>
               <Button
                  component="a"
                  href="/login"
                  size="xl"
                  className={classes.control}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}>
                  Get started
               </Button>

               <Button
                  component="a"
                  href="https://github.com/Aiden0801/Three-World"
                  size="xl"
                  variant="default"
                  className={classes.control}
                  leftIcon={<GithubIcon size={20} />}>
                  GitHub
               </Button>
            </Group>
         </Container>
      </div>
   )
}
export default Index
