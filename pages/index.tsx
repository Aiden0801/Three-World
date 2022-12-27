import axios from 'axios'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { PublicLayout } from '@/layouts/PublicLayout'
// import mailer from '@/lib/nodemailer'
import { ContactFormData, Index } from '@/page-components/Index'
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
    <PublicLayout>
      <Index onFormSubmit={handleContactSubmit} />
    </PublicLayout>
  )
}
export default Home
