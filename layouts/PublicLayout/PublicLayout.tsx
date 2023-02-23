import type { PropsWithChildren } from 'react'
import { AppShell } from '@mantine/core'
import Header from './Header'
import Footer from './Footer'
import { PwaInstallBanner } from '@/components/PwaInstall'

/**
 * Layout for the public pages
 */
export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <AppShell
      padding={0}
      header={<Header />}
      footer={<Footer />}
      styles={(theme) => ({
        body: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
      })}
    >
      <PwaInstallBanner />
      {children}
    </AppShell>
  )
}
