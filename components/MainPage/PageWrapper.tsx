import { useState } from 'react'
import { AppShell } from '@mantine/core'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Navbar from './Navbar'
import { useCallback } from 'react'
const PageWrapper = ({ children, currentPage }) => {
   const [opened, setOpened] = useState(false)
   const handlenavtoogle = useCallback(() => {
      setOpened(!opened)
   }, [opened])
   return (
      <>
         <AppShell
            padding={0}
            navbar={
               <Navbar
                  hidden={!opened}
                  hiddenBreakpoint="sm"
                  width={{ sm: 200 }}
                  initialState={currentPage}
               />
            }
            header={<Header handlenavtoogle={handlenavtoogle} />}
            footer={<Footer />}>
            {children}
         </AppShell>
      </>
   )
}
export default PageWrapper
