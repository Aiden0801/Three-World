import { Container, Text } from '@mantine/core'
import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'
const Dashboard: React.FC = () => {
   const { data: session, status } = useSession()
   return (
      // <Suspense fallback={<div>Loading</div>}>
      <Container
         style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
         }}>
         <Link href="/sessions"> Click to Create a New Session</Link>
         <Link href="/browsers"> Set a session to browser</Link>
         <Link href="/share"> Start sharing</Link>
         <Text
            style={{ fontSize: '20px' }}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit>
            Coming Soon
         </Text>
      </Container>
      // </Suspense>
   )
}

export default Dashboard
