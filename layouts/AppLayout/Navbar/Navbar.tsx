import {
  Code,
  createStyles,
  Divider,
  Group,
  Image,
  MediaQuery,
  Navbar as MantineNavbar,
  NavbarProps,
  ScrollArea,
  Text,
} from '@mantine/core'
import { NAVIGATION } from '@/config/website'
import { useMobileBreakpoint, useNavbarState } from '@/contexts/AppLayout'
import { MenuItem } from './MenuItem'
import { NavbarFooter } from './Navbar.Footer'
import { UserMenu } from './UserMenu'
import { ToggleMenuButton } from '@/components/ToggleMenuButton'
import { ImageLogo, TextLogo } from '../Logo'

const useStyles = createStyles((theme, _params) => {
  return {
    container: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  }
})
/**
 * Same props as Mantine Navbar, but without children
 */
interface INavbarProps extends Omit<NavbarProps, 'children'> {
  /**
   * current page we're in
   * @dev TODO: this is kinda ugly? maybe we can do something better?
   *        maybe we can use the router to get the current page instead
   *        of passing it down from the page? If we need to map "random"
   *        strings to the page name, we can do that in the component
   *        instead of in the page, through an helper function.
   */
  currentPage?: string
  /**
   * if true shows the navbar footer
   * @default true
   * */
  showFooter?: boolean
  /**
   * if true shows the user popup menu (logout, settings, etc)
   * @default true
   */
  showUserMenu?: boolean
}
const Navbar: React.FC<INavbarProps> = ({
  currentPage,
  showUserMenu = true,
  showFooter = true,
  ...props
}) => {
  const { classes } = useStyles()
  const [opened] = useNavbarState()
  const breakpoint = useMobileBreakpoint()

  return (
    <MantineNavbar
      p="xs"
      className={classes.container}
      // styles={{ root: { width: '100%', margin: 0 } }}
      {...props}
      hidden={!opened}
    >
      {/* @dev this is in advance of completely refactoring the header out of the layout */}
      <MediaQuery largerThan={breakpoint} styles={{ display: 'none' }}>
        <MantineNavbar.Section>
          <Group position="apart" mx="sm">
            <ToggleMenuButton />
            {/* <Text color="dimmed">Close menu</Text> */}
            <TextLogo/>
          </Group>
        </MantineNavbar.Section>
      </MediaQuery>
      <MediaQuery smallerThan={breakpoint} styles={{ display: 'none' }}>
      <MantineNavbar.Section>
        <Group position="apart">
          <ImageLogo />
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
        </Group>
        </MantineNavbar.Section>
      </MediaQuery>

      <Divider my={{base: 'sm', [breakpoint]: "xl" }} />
      {/* <SearchBox mb="md" disabled /> */}

      <MantineNavbar.Section grow component={ScrollArea}>
        {NAVIGATION.MAIN.map((item, index) => (
          <MenuItem key={index} item={item} currentPage={currentPage} />
        ))}
      </MantineNavbar.Section>
      {showUserMenu && (
        <MantineNavbar.Section>
          <UserMenu />
        </MantineNavbar.Section>
      )}
      {showFooter && (
        <>
          <Divider my={{ base: 'xs', sm: 'md' }} />
          <MantineNavbar.Section>
            <NavbarFooter />
          </MantineNavbar.Section>
        </>
      )}
    </MantineNavbar>
  )
}
export default Navbar
