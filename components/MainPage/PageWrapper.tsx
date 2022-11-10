import { useState } from 'react'
import { AppShell } from '@mantine/core'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Navbar from './Navbar'
import { useCallback } from 'react'
const PageWrapper = ({ children, currentPage }) => {
   const [opened, setOpened] = useState(false)
   const handleNavToogle = useCallback(() => {
      setOpened(!opened)
   }, [opened])
   return (
      <>
         <AppShell
            padding={0}
            navbar={
               <Navbar
                  handleNavToogle={handleNavToogle}
                  hidden={!opened}
                  hiddenBreakpoint="sm"
                  width={{ sm: 300 }}
                  initialState={currentPage}
               />
            }
            header={<Header handleNavToogle={handleNavToogle} />}
            footer={<Footer />}>
            {children}
         </AppShell>
      </>
   )
}
export default PageWrapper
