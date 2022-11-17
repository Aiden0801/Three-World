import styles from './layout.module.css'
import Header from './Header'
import Footer from './Footer'
import { AppShell } from '@mantine/core'
const Layout = ({ children }) => {
   return (
      <>
         <AppShell padding={0} header={<Header />} footer={<Footer />}>
            {children}
         </AppShell>
      </>
   )
}
export default Layout
