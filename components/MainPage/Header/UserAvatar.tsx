import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import {
   UnstyledButton,
   Indicator,
   Avatar,
   Popover,
   Button,
} from '@mantine/core'
import { IconLogout, IconSettings } from '@tabler/icons'
export default function UserAvatar({ img }) {
   const [opened, setOpened] = useState(false)
   return (
      <Popover opened={opened} onChange={setOpened}>
         <Popover.Target>
            <UnstyledButton onClick={() => setOpened((o) => !o)}>
               <Indicator>
                  <Avatar radius="xl" size={35} src={img} alt="img" />
               </Indicator>
            </UnstyledButton>
         </Popover.Target>
         <Popover.Dropdown>
            <Button
               fullWidth
               my="sm"
               variant="outline"
               leftIcon={<IconSettings stroke={1.5} />}>
               Settings
            </Button>
            <Button
               fullWidth
               variant="outline"
               leftIcon={<IconLogout stroke={1.5} />}
               onClick={(event) => {
                  event.preventDefault()
                  signOut({ callbackUrl: 'http://localhost:3000/' })
               }}>
               Logout
            </Button>
         </Popover.Dropdown>
      </Popover>
   )
}
