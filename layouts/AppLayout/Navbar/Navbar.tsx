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
import {
  useIsMobile,
  useMobileBreakpoint,
  useNavbarState,
  useHeaderHeight,
} from '@/contexts/AppLayout'
import { SearchBox } from '@/components/Searchbox'
import { MenuItem } from './MenuItem'
import { NavbarFooter } from './Navbar.Footer'
import { UserMenu } from './UserMenu'
import { UserButton } from './UserButton'
import { ToggleMenuButton } from '@/components/ToggleMenuButton'
import { TextLogo } from '../Logo'

import type { SystemProp,  SpacingValue } from '@mantine/core'

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
type Fix = SystemProp<SpacingValue>

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
  const headerHeight = useHeaderHeight()

  return (
    <MantineNavbar
      // p="xs"
      className={classes.container}
      withBorder={!isMobile}
      mt={{ base: headerHeight, [breakpoint]: 0 } as Fix}
      {...props}
      hidden={!opened}
    >
      <MantineNavbar.Section px="xs">
        <Group position="left" mx="sm" sx={{height: headerHeight}}>
          <MediaQuery smallerThan={breakpoint} styles={{ display: 'none' }}>
            <TextLogo />
          </MediaQuery>
        </Group>
      </MantineNavbar.Section>

      {!isMobile && <Divider mt={0} mb={0} />}

      {!isMobile && showUserMenu === 'top' && (
        <MantineNavbar.Section mt="xs" px="xs" mb="md">
          <UserMenu width="target">
            <UserButton />
          </UserMenu>
        </MantineNavbar.Section>
      )}
      {/* {!isMobile && <Divider my="xs" />} */}
      {showSearch && <SearchBox mb="md" disabled />}

      <MantineNavbar.Section grow component={ScrollArea} pl="sm" pr="xs">
        {NAVIGATION.MAIN.map((item, index) => (
          <MenuItem key={index} item={item} currentPage={currentPage} />
        ))}
      </MantineNavbar.Section>
      {!isMobile && showUserMenu === 'bottom' && (
        <MantineNavbar.Section px="xs">
          <UserMenu width="target">
            <UserButton />
          </UserMenu>
        </MantineNavbar.Section>
      )}
      {showFooter && (
        <>
          <Divider my={{ base: 'xs', sm: 'md' } as Fix} />
          <MantineNavbar.Section px="xs" pb="xs">
            <NavbarFooter />
          </MantineNavbar.Section>
        </>
      )}
    </MantineNavbar>
  )
}
export default Navbar
