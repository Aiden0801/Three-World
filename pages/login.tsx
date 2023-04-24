import { Center, useMantineColorScheme } from '@mantine/core'
import { Login } from '../page-components/Auth'
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from '@clerk/nextjs'
import { dark } from '@clerk/themes';
export default function LogInPage() {
  // { providers }
  const { colorScheme } = useMantineColorScheme()
  return (
    <>
      {/* <Login /> */}
        <Center sx={{minHeight: '100vh'}}>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignIn appearance={{
              baseTheme: colorScheme === 'dark' ? dark : undefined,
            }} />
          </SignedOut>
        </Center>
    </>
  )
}
