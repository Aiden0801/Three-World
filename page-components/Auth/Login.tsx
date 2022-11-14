import { Stack, Text, Paper, Box } from '@mantine/core'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import {
   DiscordButton,
   GithubButton,
   GoogleButton,
} from '../../components/Button'

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
      }).then((res) => {
         console.log('message', res)
      })
   }
   return (
      <>
         <Box
            sx={(theme) => ({
               backgroundColor: theme.colors.gray[1],
            })}
            style={{
               height: '100vh',
               display: 'flex',
            }}>
            <Paper
               shadow="xl"
               style={{
                  width: 300,
                  height: 220,
                  margin: 'auto',
                  padding: '10px 10px 10px 10px',
               }}>
               <Stack align="center">
                  <Text
                     weight="bold"
                     variant="gradient"
                     gradient={{ from: 'indigo', to: 'cyan' }}
                     size="xl">
                     {' '}
                     Login Method
                  </Text>
                  <GoogleButton
                     onClick={() => {
                        handleLogIn('google')
                     }}>
                     With Google
                  </GoogleButton>
                  <GithubButton
                     onClick={() => {
                        handleLogIn('github')
                     }}>
                     Login with GitHub
                  </GithubButton>
                  <DiscordButton
                     onClick={() => {
                        handleLogIn('discord')
                     }}>
                     Join with Discord
                  </DiscordButton>
               </Stack>
            </Paper>
         </Box>
      </>
   )
}
