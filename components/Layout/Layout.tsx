import styles from './layout.module.css'
import Header from './Header'
import Footer from './Footer'
import { AppShell } from '@mantine/core'
const Layout = ({ children }) => {
   return (
      <>
<<<<<<< HEAD
         <Container>
            <Header />
            <main>{children}</main>
            <Footer />
         </Container>
=======
         <AppShell padding={0} header={<Header />} footer={<Footer />}>
            {children}
         </AppShell>
>>>>>>> 801cc9e9fc256c4e528d84eb5d12645a1d5fa522
      </>
   )
}
export default Layout
