import { ThemeContext } from '@emotion/react'
import { Divider, Stack, Text } from '@mantine/core'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import {
   DiscordButton,
   GithubButton,
   GoogleButton,
} from '../../components/Button'
import { Box } from '@mantine/core'
export default function Login() {
   const router = useRouter()

   const { data: session, status } = useSession()

   console.log(status)
   useEffect(() => {
      console.log(status)
      if (status === 'authenticated') {
         router.push('./')
      }
   }, [status])
   const handleLogIn = async (providerName: string) => {
      await signIn(providerName.toLowerCase(), {
         callbackUrl: 'http://localhost:3000/dashboard',
      })
   }
   return (
      <>
         <Box
            style={{
               width: '100%',
               height: '100vh',
               display: 'flex',
            }}
            sx={(theme) => ({
               backgroundColor:
                  theme.colorScheme === 'dark'
                     ? theme.colors.dark[7]
                     : theme.colors.gray[2],
               height: 300,
            })}>
            <Stack
               style={{
                  margin: 'auto',
                  padding: '10px 10px 10px 10px',
               }}
               align="center"
               sx={(theme) => ({
                  backgroundColor:
                     theme.colorScheme === 'dark'
                        ? theme.colors.dark[8]
                        : theme.colors.gray[1],
                  width: 350,
                  height: 220,
                  border: '2px solid',
                  borderColor: theme.colors.gray[5],
                  borderRadius: 'xl',
               })}>
               <Text>
                  Welcome to
                  <Text
                     span
                     weight="bold"
                     variant="gradient"
                     gradient={{ from: 'indigo', to: 'cyan' }}
                     size="xl">
                     {' '}
                     Three World
                  </Text>
               </Text>
               <GoogleButton
                  fullWidth
                  onClick={() => {
                     handleLogIn('google')
                  }}>
                  Join with Google
               </GoogleButton>
               <GithubButton
                  fullWidth
                  onClick={() => {
                     handleLogIn('github')
                  }}>
                  Login with GitHub
               </GithubButton>
               <DiscordButton
                  fullWidth
                  onClick={() => {
                     handleLogIn('discord')
                  }}>
                  Join with Discord
               </DiscordButton>
            </Stack>
         </Box>
      </>
   )
}
