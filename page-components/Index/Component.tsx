import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createStyles, Container, Text, Button, Group } from '@mantine/core'
import { GithubIcon } from '@mantine/ds'
import React from 'react'
import { FeaturesCards } from '../../components/LandingPage/Features'
import LandingCard from '../../components/LandingPage/Landing'
import { FaqWithBg } from '../../components/LandingPage/FAQ'

const Index: React.FC = () => {
   const router = useRouter()
   const { data: session, status } = useSession()

   useEffect(() => {
      console.log('index', status)
      if (status == 'authenticated') {
         console.log('rouing')
         router.push('./dashboard')
      }
   }, [status])
   return (
      <div style={{}}>
         <LandingCard />
         <FeaturesCards />
         <FaqWithBg />
      </div>
   )
}
export default Index
