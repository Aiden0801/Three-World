import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { PublicLayout } from '@/layouts/PublicLayout'
import { Index } from '@/page-components/Index'
const Home: React.FC = () => {
  const loading = useAuthRedirect({
    redirects: {
      authenticated: '/dashboard',
    }
  })

  if (loading) {
    // TODO: Add loading component
    return <></>
  }

  return (
    <PublicLayout>
      <Index />
    </PublicLayout>
  )
}
export default Home
/**Test */
