import Head from 'next/head'
import axios from 'axios'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { PublicLayout } from '@/layouts/PublicLayout'
// import mailer from '@/lib/nodemailer'
import {
  ContactFormData,
  Hero,
  Services,
  Worlds,
  About,
  ContactSectionWithForm,
} from '@/page-components/Index'
// import logger from '@/utils/logger'

async function handleContactSubmit(values: ContactFormData) {
  const r = await axios.post('/api/contacts', values)
  // TODO: return boolean based on success. used in the form component
  // to show a notification to the user
  // logger.debug(`email call attempted ${r.status} (frontend)`)
  return r.status === 200
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
        {/* <Index onFormSubmit={handleContactSubmit} /> */}
        <Hero />
        <Worlds />
        <About />
        <Services />
        <ContactSectionWithForm onSubmit={handleContactSubmit} />
      </PublicLayout>
    </>
  )
}
export default Home
