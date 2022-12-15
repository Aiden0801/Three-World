import {
  createStyles,
  Divider,
  Group,
  MediaQuery,
  Navbar as MantineNavbar,
  NavbarProps,
  ScrollArea,
} from '@mantine/core'
import { NAVIGATION } from '@/config/website'
import { useIsMobile, useMobileBreakpoint, useNavbarState } from '@/contexts/AppLayout'
import { MenuItem } from './MenuItem'
import { NavbarFooter } from './Navbar.Footer'
import { UserMenu } from './UserMenu'
import { ToggleMenuButton } from '@/components/ToggleMenuButton'
import { ImageLogo, TextLogo } from '../Logo'
import { SearchBox } from '@/components/Searchbox'
import { UserButton } from './UserButton'

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
   * If not false, adds the user button with menu.
   * Default position is on top on the menu, but it can be overridden to be
   * at the bottom.
   *
   * @default 'top'
   */
  showUserMenu?: false | 'bottom' | 'top'
  /**
   * if true shows the search box
   * @default false
   */
  showSearch?: boolean
}
const Navbar: React.FC<INavbarProps> = ({
  currentPage,
  showUserMenu = 'top',
  showFooter = true,
  showSearch = false,
  ...props
}) => {
  const { classes } = useStyles()
  const [opened] = useNavbarState()
  const breakpoint = useMobileBreakpoint()
  const isMobile = useIsMobile()

  return (
    <MantineNavbar
      p="xs"
      className={classes.container}
      {...props}
      hidden={!opened}
    >
      <MantineNavbar.Section>
        <Group position="left" mx="sm">
          <MediaQuery largerThan={breakpoint} styles={{ display: 'none' }}>
            <ToggleMenuButton />
          </MediaQuery>
          <TextLogo />
        </Group>
      </MantineNavbar.Section>

      <Divider mt={{ base: 'sm', [breakpoint]: 'xl' }} mb="md" />

      {!isMobile && showUserMenu === 'top' && (
        <MantineNavbar.Section>
          <UserMenu width="target">
            <UserButton />
          </UserMenu>
        </MantineNavbar.Section>
      )}
      {!isMobile && <Divider my={{ base: 'sm', [breakpoint]: 'md' }} />}
      {showSearch && <SearchBox mb="md" disabled />}

      <MantineNavbar.Section grow component={ScrollArea}>
        {NAVIGATION.MAIN.map((item, index) => (
          <MenuItem key={index} item={item} currentPage={currentPage} />
        ))}
      </MantineNavbar.Section>
      {!isMobile && showUserMenu === 'bottom' && (
        <MantineNavbar.Section>
          <UserMenu width="target">
            <UserButton />
          </UserMenu>
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
