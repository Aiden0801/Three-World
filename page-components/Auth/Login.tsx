import {
   Stack,
   Text,
   Paper,
   Box,
   createStyles,
   LoadingOverlay,
} from '@mantine/core'
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
   box: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: theme.fn.linearGradient(
         135,
         theme.colors.indigo[0],
         theme.colors.indigo[1]
      ),
   },
   container: {
      background: theme.fn.linearGradient(
         180,
         theme.colors.gray[4],
         theme.colors.cyan[5]
      ),
      width: '400px',

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
         maxWidth: '80%',
         maxHeight: '50%',
      },
      height: '350px',
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
      setLoading(false)
   }
   return (
      <>
         <Box className={classes.box}>
            <Paper shadow="xl" className={classes.container} radius="lg">
               <LoadingOverlay visible={loading} overlayBlur={2} />
               <Stack align="center">
                  <Image
                     alt=""
                     src="/logo/Group_157.png"
                     width={120}
                     height={80}
                  />
                  <Text
                     weight="bold"
                     variant="gradient"
                     gradient={{ from: 'indigo', to: 'cyan' }}
                     size="xl">
                     {' '}
                     SIGN IN
                  </Text>
                  <GoogleButton
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
