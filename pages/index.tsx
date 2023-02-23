import Head from 'next/head'
import axios from 'axios'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { PublicLayout } from '@/layouts/PublicLayout'
// import mailer from '@/lib/nodemailer'
import {
  Hero,
  Services,
  Features,
  Worlds,
  About,
  ContactSectionWithForm,
} from '@/page-components/Index'
import type { ContactFormData } from '@/components/ContactForm'
// import logger from '@/utils/logger'

async function handleContactSubmit(values: ContactFormData) {
  const r = await axios.post('/api/contacts', values)
  return r.statusText === 'OK'
}


const Home: React.FC = () => {
  const loading = useAuthRedirect({
    redirects: {
      // @dev this should be active. just disabled to work with the landing page
      // authenticated: '/dashboard',
    },
  })

  if (loading) {
    // TODO: Add loading component
    return <></>
  }

  return (
    <>
      <Head>
        <title>Virtual Pro Galaxy</title>
        <meta name="description" content="Virtual Pro Galaxy" />
      </Head>
      <PublicLayout>
        {/* <Hero onPrimaryClick={() => setDemoDialogOpen((p) => !p)} /> */}
        <Hero />
        <Features />
        <Worlds />
        <About />
        <Services />
        <ContactSectionWithForm onSubmit={handleContactSubmit} />
      </PublicLayout>
    </>
  )
}
export default Home
