import { useCallback, useEffect, useState } from 'react'
import {
  Stack,
  createStyles,
  LoadingOverlay,
  Center,
  Card,
  Divider,
  MantineTheme,
  Title,
} from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

import { serverURL } from '../../config/urlcontrol'
import { SocialButton } from '../../components/Button'

const loginProviders = [
  {
    id: 'google',
    name: 'Google',
    button: SocialButton.Google,
  },
  {
    id: 'discord',
    name: 'Discord',
    button: SocialButton.Discord,
  },
  {
    id: 'github',
    name: 'GitHub',
    button: SocialButton.Github,
  },
]

const dark = (theme: MantineTheme) => theme.colorScheme === 'dark'
const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100vh',
    background: dark(theme)
      ? theme.fn.linearGradient(135, theme.colors.dark[6], theme.colors.dark[9])
      : theme.fn.linearGradient(
          135,
          theme.colors.indigo[0],
          theme.colors.indigo[1]
        ),
  },
  container: {
    width: '400px',
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '80%',
      maxHeight: '90%',
    },
  },
}))
export default function Login() {
  const { status } = useSession()
  const { classes } = useStyles()
  console.log(status)
  const router = useRouter()
  useEffect(() => {
    console.log(status)
    if (status === 'authenticated') {
      router.push('./dashboard')
    }
  }, [status])
  const [loading, setLoading] = useState(false)

  const handleLogIn = useCallback(
    async (providerName: string) => {
      setLoading(true)
      await signIn(providerName.toLowerCase(), {
        callbackUrl: `${serverURL}/dashboard`,
      }).then((res) => {
        console.log('message', res)
      })
      setLoading(false)
    },
    [setLoading]
  )
  return (
    <>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Center className={classes.wrapper}>
        <Card
          withBorder
          p="xl"
          shadow="xl"
          className={classes.container}
          radius="lg"
        >
          <Stack align="center">
            <Image alt="" src="/logo/Group_157.png" width={120} height={80} />
            <Title order={3} weight="bold">
              SIGN IN
            </Title>
            <Divider sx={{ width: '100%' }} />
            {loginProviders.map((provider) => (
              <provider.button
                key={provider.id}
                onClick={() => handleLogIn(provider.id)}
                compact={false} // avoids removing the compact prop from the buttons
                radius="sm"
                fullWidth
              >
                Login with {provider.name}
              </provider.button>
            ))}
          </Stack>
        </Card>
      </Center>
    </>
  )
}
