import { AppShell } from '@mantine/core'

// import Header from './Header/Header'
// import Footer from './Footer/Footer'
import Navbar from './Navbar'
import { UserContextProvider, MainLayoutContextProvider } from '@/contexts'

export interface MainLayoutProps {
  children: React.ReactNode
  currentPage: string
}

export function AppLayout({ children, currentPage }: MainLayoutProps) {
  return (
    <MainLayoutContextProvider>
      <UserContextProvider>
        <AppShell
          fixed
          padding={0}
          layout="alt"
          navbarOffsetBreakpoint="sm"
          // header={<Header />}
          navbar={
            <Navbar
              width={{ base: '100%', sm: 285 }}
              currentPage={currentPage}
              showUserMenu
              showFooter
            />
          }
        >
          {children}
        </AppShell>
      </UserContextProvider>
    </MainLayoutContextProvider>
  )
}
