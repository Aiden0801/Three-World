import { AppShell } from '@mantine/core'

// import Header from './Header/Header'
// import Footer from './Footer/Footer'
import Navbar from './Navbar'
import { MainLayoutContextProvider } from './MainLayout.context'
import { UserContextProvider } from '../UserContext'

const PageWrapper = ({ children, currentPage }) => {
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
export default PageWrapper
