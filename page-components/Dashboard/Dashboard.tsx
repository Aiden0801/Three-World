import { Text } from '@mantine/core'
import { useSession } from 'next-auth/react'
import React from 'react'
const Dashboard: React.FC = () => {
   const { data: session, status } = useSession()
   return (
      // <Suspense fallback={<div>Loading</div>}>
      <div style={{ display: 'flex' }}>
         <Text
            style={{ margin: 'auto', fontSize: '50px' }}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit>
            Coming Soon
         </Text>
      </div>
      // </Suspense>
   )
}

export default Dashboard
