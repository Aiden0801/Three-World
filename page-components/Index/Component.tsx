import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createStyles, Container, Text, Button, Group } from '@mantine/core'
import { GithubIcon } from '@mantine/ds'
import React from 'react'
import { FeaturesCards } from '../../components/LandingPage/Features'
import LandingCard from '../../components/LandingPage/Landing'
import { FaqWithBg } from '../../components/LandingPage/FAQ'
import { ContactUs } from '../../components/LandingPage/ContactUs'

const Index: React.FC = () => {
   const router = useRouter()
   const { data: session, status } = useSession()

   useEffect(() => {
      console.log('index', status)
      if (status == 'authenticated') {
         console.log('rouing')
         router.push('./dashboard')
      }
   }, [router, status])
   return (
      <div
         style={{
            // backdropFilter: 'blur(5px) drop-shadow(4px 4px 10px blue)',
            zIndex: 1,
            position: 'relative',
         }}>
         <LandingCard />
         <FeaturesCards />
         <FaqWithBg />
         {/* <ContactUs /> */}
      </div>
   )
}
/**
 *
 * TODO Contact Us part removed
 */
export default Index
