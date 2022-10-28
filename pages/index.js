import { Index } from '../page-components/Index'
import { LandingPage } from '../page-components/ThreeJS'
import { Layout } from '../components/Layout'
export default function Home() {

  return (
    <>
      <Layout>
        <Index />
      </Layout>

      <LandingPage />
    </>
  )
}
