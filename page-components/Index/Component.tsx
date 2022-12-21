import LandingCard from '@/components/LandingPage/Landing'
import { FeaturesCards } from '@/components/LandingPage/Features'
import { FaqWithBg } from '@/components/LandingPage/FAQ'
import { ContactUs } from '@/components/LandingPage/ContactUs'

export function Index () {
  return (
    <>
      <LandingCard />
      <FeaturesCards />
      <FaqWithBg />
      <ContactUs />
    </>
  )
}
