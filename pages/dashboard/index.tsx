import { Card, Container, createStyles, Title } from '@mantine/core'
import { AppLayout } from '@/layouts/AppLayout'
import { useUserData } from '@/contexts/User'
import Head from 'next/head'

const useStyles = createStyles((theme) => ({
  comingSoon: {
    pointerEvents: 'none',
    userSelect: 'none',
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 200,
    lineHeight: 1,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },
}))

export default function DashboardHome() {
  const { classes } = useStyles()
  return (
    <AppLayout currentPage="Dashboard">
      <Container size="xl" mt="md">
        <Card my="md">
          <WelcomeUser />
          <p>You can use the sidebar to navigate to sections</p>
        </Card>
        {/* <Card withBorder> */}
        <Title className={classes.comingSoon}>Coming Soon</Title>
        {/* </Card> */}
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
