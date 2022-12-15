import { AppShell, MantineSize } from '@mantine/core'

import { UserContextProvider, AppLayoutContextProvider } from '@/contexts'

import Header from './Header/Header'
import Navbar from './Navbar'
// import Footer from './Footer/Footer'

export interface MainLayoutProps {
  children: React.ReactNode
  currentPage: string
}

// consistentcy between all the responsive actions of the layout
const mobileBreakpoint: MantineSize = 'md'

export function AppLayout({ children, currentPage }: MainLayoutProps) {
  return (
    <UserContextProvider>
      <AppLayoutContextProvider mobileBreakpoint={mobileBreakpoint}>
        <AppShell
          padding={0}
          layout="alt" // TODO: Fix responsivness of header/footer
          navbarOffsetBreakpoint={'md'}
          header={<Header />}
          navbar={
            <Navbar
              width={{ [mobileBreakpoint]: 285 }}
              currentPage={currentPage}
            />
          }
        >
          {children}
        </AppShell>
      </AppLayoutContextProvider>
    </UserContextProvider>
  )
}
