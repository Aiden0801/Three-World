import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ContactFormData, Index } from '@/page-components/Index'
import logger from '@/utils/logger'

async function handleContactSubmit(values: ContactFormData) {
  logger.debug(values)
  /**
   * @vlad TODO: put in some call to something that actually sends the email
   * All the functionality should go in here if possibile. the function is already
   * hooked up to the component, notifications to the user etc.
   * Just remove the next 3 lines and put in your code
   */
  await new Promise((resolve) => setTimeout(resolve, 1000))
  logger.debug('done waiting')
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
