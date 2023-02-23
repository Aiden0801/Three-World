import {
  Card,
  Container,
  createStyles,
  Title,
  Text,
  Stack,
  Center,
  Group,
  Button,
  Modal,
} from '@mantine/core'
import { AppLayout } from '@/layouts/AppLayout'
import { VpgLogo } from '@/components/VpgLogo'
import { DemoFormValues, EarlyAccessForm } from '@/components/EarlyAccessForm'
import { useCallback, useState } from 'react'
import axios from 'axios'



async function requestDemoAPI(values: DemoFormValues) {
  const r = await axios.post('/api/contacts/request-access', values)
  return r.statusText === 'OK'
}

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
  const [demoDialogOpened, setDemoDialogOpen] = useState(false)

  const handleRequestDemo = useCallback(async (values: DemoFormValues) => {
    const sent = await requestDemoAPI(values)
    if (sent) {
      setDemoDialogOpen(false)
    }
    return sent
  }, [])

  const { classes, cx } = useStyles()
  return (
    <AppLayout currentPage="Dashboard">
      <Container size="xl" mt="md">
        <Card my="md">
          <Group position="apart">
            <Title>Greetings Virtual Pro!</Title>
            <Button onClick={() => setDemoDialogOpen((p) => !p)}>Request early access</Button>
            </Group>
        </Card>
        <Stack>
          <Title className={classes.comingSoon}>Welcome</Title>
          <Center>
            <VpgLogo height={200} />
          </Center>
          <Text className={cx(classes.comingSoon, classes.extra)}>
            Explore the <i>Virtual Pro Galaxy™️</i>
          </Text>
        </Stack>
      </Container>
      <EarlyAccessDialog
          open={demoDialogOpened}
          setOpen={setDemoDialogOpen}
          onSubmit={handleRequestDemo}
        />
    </AppLayout>
  )
}

type DialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (values: DemoFormValues) => Promise<boolean>
}
function EarlyAccessDialog({ open, setOpen, onSubmit }: DialogProps) {
  return (
    <Modal
      withCloseButton
      opened={open}
      onClose={() => setOpen(false)}
      size="lg"
      radius="md"
      shadow="xl"
      title="Request early access"
    >
      <Text size="sm" mb="xl">
        We are currently in the process of building the Virtual Pro Galaxy™️.
        If you would like to be notified when we launch, please fill out the form below.
      </Text>
      <EarlyAccessForm onSubmit={onSubmit} />
    </Modal>
  )
}


