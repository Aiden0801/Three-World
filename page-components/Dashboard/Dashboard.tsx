import { Text } from '@mantine/core'
import React from 'react'

const Dashboard: React.FC = () => {
   return (
      <div style={{ display: 'flex' }}>
         <Text
            style={{ margin: 'auto', fontSize: '50px' }}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit>
            Coming Soon
         </Text>
      </div>
   )
}

export default Dashboard
