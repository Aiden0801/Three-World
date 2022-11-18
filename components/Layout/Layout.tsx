import styles from './layout.module.css'
import Header from './Header'
import Footer from './Footer'
import { Container } from '@mantine/core'
const Layout = ({ children }) => {
   return (
      <>
         <Container>
            <Header />
            <main>{children}</main>
            <Footer />
         </Container>
      </>
   )
}
export default Layout
