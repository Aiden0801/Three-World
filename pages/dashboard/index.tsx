import {
  Card,
  Container,
  createStyles,
  Title,
  Text,
  Stack,
  Image,
  Center,
} from '@mantine/core'
import { AppLayout } from '@/layouts/AppLayout'
import { useUserData } from '@/contexts/User'
import Head from 'next/head'
import { VpgLogo } from '@/components/VpgLogo'

const useStyles = createStyles((theme) => ({
  comingSoon: {
    pointerEvents: 'none',
    userSelect: 'none',
    textAlign: 'center',
    fontWeight: 900,
    fontSize: '10rem',
    lineHeight: 1,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: '6rem',
    },
  },
  extra: {
    fontSize: '4rem',
    [theme.fn.smallerThan('sm')]: {
      fontSize: '2rem',
    },
  },
}))

export default function DashboardHome() {
  const { classes, cx } = useStyles()
  return (
    <AppLayout currentPage="Dashboard">
      <Container size="xl" mt="md">
        <Card my="md">
        <WelcomeUser />
        </Card>
        {/* <Card withBorder> */}
        <Stack>
          <Title className={classes.comingSoon}>Welcome</Title>
          <Center>
            <VpgLogo height={200} />
          </Center>
          <Text className={cx(classes.comingSoon, classes.extra)}>
            Explore the <i>Virtual Pro Galaxy™️</i>
          </Text>
          {/* </Card> */}
        </Stack>
      </Container>
    </AppLayout>
  )
}

// This is a separate component because the context for useUserData is
// only available in the AppLayout, so we can't use it in the page component
function WelcomeUser() {
  const user = useUserData()
  return <Title>Hello, {user.name ?? user.email}</Title>
}
