import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ContactFormData, Index } from '@/page-components/Index'
import logger from '@/utils/logger'


async function handleContactSubmit(values: ContactFormData) {
  // logger.debug(values)
   /**
   * @vlad TODO: Add POST call to /api/contacts with the provided values.
   * the server will revalidate the data and send an email to the target email.
   */
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // logger.debug('done waiting')
  // TODO: return the actual value from the api call. this is used to show
  // a notification to the user if the message was sent or not
  return true

}


const Home: React.FC = () => {
  const loading = useAuthRedirect({
    redirects: {
      // @dev this should be active. just disabled to work with the landing page
      // authenticated: '/dashboard',
    }
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
