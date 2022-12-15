import {
  AppShell,
  Container,
} from '@mantine/core'
import LandingPagesForm from '@/components/LandingPagesForm/LandingPagesForm'

import { BASE_URL } from '@/config/constants'
import { FormContextProvider } from '@/lib/landing-pages'

export default function LandingPageFormDemo() {
  return (
    <AppShell>
      <Container size="xl">
      <FormContextProvider baseUrl={BASE_URL.CLIENT}>
        <LandingPagesForm/>
      </FormContextProvider>
      </Container>
    </AppShell>
  )
}
