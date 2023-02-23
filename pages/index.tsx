import Head from 'next/head'
import axios from 'axios'
import { useCallback, useState } from 'react'
import {
  Card,
  Dialog,
  Divider,
  MantineProvider,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { PublicLayout } from '@/layouts/PublicLayout'
// import mailer from '@/lib/nodemailer'
import {
  Hero,
  Services,
  Worlds,
  About,
  ContactSectionWithForm,
} from '@/page-components/Index'
import {
  type DemoFormValues,
  RequestDemoForm,
} from '@/components/RequestDemoForm'
import type { ContactFormData } from '@/components/ContactForm'
// import logger from '@/utils/logger'

async function handleContactSubmit(values: ContactFormData) {
  const r = await axios.post('/api/contacts', values)
  return r.statusText === 'OK'
}

async function requestDemoAPI(values: DemoFormValues) {
  const r = await axios.post('/api/contacts/request-demo', values)
  return r.statusText === 'OK'
}

const Home: React.FC = () => {
  const [demoDialogOpened, setDemoDialogOpen] = useState(false)
  const { colorScheme } = useMantineColorScheme()
  const loading = useAuthRedirect({
    redirects: {
      // @dev this should be active. just disabled to work with the landing page
      // authenticated: '/dashboard',
    },
  })

  const handleRequestDemo = useCallback(async (values: DemoFormValues) => {
    const sent = await requestDemoAPI(values)
    if (sent) {
      setDemoDialogOpen(false)
    }
    return sent
  }, [])

  if (loading) {
    // TODO: Add loading component
    return <></>
  }

  return (
    <>
      <Head>
        <title>Virtual Pro Galaxy</title>
        <meta name="description" content="Virtual Pro Galaxy" />
      </Head>
      <PublicLayout>
        {/* <Hero onPrimaryClick={() => setDemoDialogOpen((p) => !p)} /> */}
        <Hero />
        <Worlds />
        <About />
        <Services />
        <ContactSectionWithForm onSubmit={handleContactSubmit} />
      </PublicLayout>
      <MantineProvider
        // invert the theme for the dialog so it pops up nicely
        theme={{ colorScheme: colorScheme === 'dark' ? 'light' : 'dark' }}
      >
        <DemoDialog
          open={demoDialogOpened}
          setOpen={setDemoDialogOpen}
          onSubmit={handleRequestDemo}
        />
      </MantineProvider>
    </>
  )
}
export default Home

type DialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (values: DemoFormValues) => Promise<boolean>
}
function DemoDialog({ open, setOpen, onSubmit }: DialogProps) {
  return (
    <Dialog
      withCloseButton
      opened={open}
      onClose={() => setOpen(false)}
      size="lg"
      radius="md"
      shadow="xl"
    >
      <Title order={3} mb="xs" weight={500} transform="uppercase">
        Request a demo
      </Title>
      <Divider my="xs" />
      <Text size="sm" mb="xl">
        Fill out the form below and we will get back to you as soon as possible.
      </Text>
      <RequestDemoForm onSubmit={onSubmit} />
    </Dialog>
  )
}


