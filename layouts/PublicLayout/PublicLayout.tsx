import type { PropsWithChildren } from 'react'
import { AppShell } from '@mantine/core'
import Header from './Header'
import Footer from './Footer'

/**
 * Layout for the public pages
 */
export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <AppShell padding={0} header={<Header />} footer={<Footer />}>
      {children}
    </AppShell>
  )
}
