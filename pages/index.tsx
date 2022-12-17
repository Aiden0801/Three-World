import { PublicLayout } from '@/layouts/PublicLayout'
import { Index } from '@/page-components/Index'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
const Home: React.FC = () => {
  const session = useSession()
  /**
   * @dev just for NOW
   */
  const router = useRouter()
  if (session.status === 'loading') return <></>
  if (session.status === 'authenticated') router.push('./dashboard')
  if (session.status === 'unauthenticated') router.push('./login')
  return <></>
  return (
    <>
      <PublicLayout>
        <Index />
      </PublicLayout>
    </>
  )
}
export default Home
/**Test */
