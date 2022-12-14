import {
  AppShell,
  Container,
} from '@mantine/core'
import LandingPagesForm from '../../components/LandingPagesForm/LandingPagesForm'

import { clientAppURL } from '../../config/urlcontrol'
import { FormContextProvider } from '../../lib/landing-pages'

export default function LandingPageFormDemo() {
  return (
    <AppShell>
      <Container size="xl">
      <FormContextProvider baseUrl={clientAppURL}>
        <LandingPagesForm/>
      </FormContextProvider>
      </Container>
    </AppShell>
  )
}
