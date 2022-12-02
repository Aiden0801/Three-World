import { Stack, Text, Paper, Box, createStyles } from '@mantine/core'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { serverURL } from '../../config/urlcontrol'
import Image from 'next/image'
import {
   DiscordButton,
   GithubButton,
   GoogleButton,
} from '../../components/Button'

const useStyles = createStyles((theme) => ({
   container: {
      background: theme.fn.linearGradient(
         180,
         theme.colors.gray[4],
         theme.colors.cyan[5]
      ),
      width: 500,
      height: 360,
      margin: 'auto',
      padding: '10px 10px 10px 10px',
   },
}))
export default function Login() {
   const router = useRouter()

   const { data: session, status } = useSession()
   const { classes } = useStyles()
   console.log(status)
   useEffect(() => {
      console.log(status)
      if (status === 'authenticated') {
         router.push('./dashboard')
      }
   })
   const [loading, setLoading] = useState(false)
   const handleLogIn = async (providerName: string) => {
      await signIn(providerName.toLowerCase(), {
         callbackUrl: `${serverURL}/dashboard`,
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
               flexDirection: 'column',
            }}>
            <Paper shadow="xl" className={classes.container} radius="lg">
               <Stack align="center">
                  <Image
                     alt=""
                     src="/logo/Group_157.png"
                     width={100}
                     height={80}
                  />
                  <Text
                     weight="bold"
                     variant="gradient"
                     gradient={{ from: 'indigo', to: 'cyan' }}
                     size="xl">
                     {' '}
                     Login Method
                  </Text>
                  <GoogleButton
                     loading={loading}
                     onClick={() => {
                        setLoading(true)
                        handleLogIn('google')
                     }}>
                     Login With Google
                  </GoogleButton>
                  <GithubButton
                     onClick={() => {
                        setLoading(true)
                        handleLogIn('github')
                     }}>
                     Login with GitHub
                  </GithubButton>
                  <DiscordButton
                     onClick={() => {
                        setLoading(true)
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
