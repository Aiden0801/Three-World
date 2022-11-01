import { Index } from '../page-components/Index'
import { LandingPage } from '../page-components/ThreeJS'
import { Layout } from '../components/Layout'
const Home: React.FC = () => {

  return (
    <>
      <Layout>
        <Index />
      </Layout>
      <LandingPage />
    </>
  )
}
export default Home;
/**Test */