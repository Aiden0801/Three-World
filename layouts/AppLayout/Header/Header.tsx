import {
  createStyles,
  Flex,
  Group,
  Header,
  MediaQuery,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core'
import UserAvatar from './UserAvatar'
import { ToggleMenuButton } from '@/components/ToggleMenuButton'
import { useMobileBreakpoint } from '@/contexts/AppLayout'
import { TextLogo } from '../Logo'
import { BreadCrumbsNav } from './Breadcrumbs'
import { SearchBox } from '@/components/Searchbox'
import { UserMenu } from '../Navbar/UserMenu'
import { useHeaderHeight } from '@/contexts/AppLayout'

const useStyles = createStyles((theme, _params) => {
  return {
    container: {
      zIndex: 101,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  }
})
/**
 * Header component for the main layout.
 * Contains the logo, search box, color scheme toggle, and user avatar.
 * @deprecated in favor of a slimmer navbar with all the same stuff
 */
const HeaderComponent = ({ showSearch = false }) => {
  const { classes } = useStyles()
  const breakpoint = useMobileBreakpoint()
  const headerHeight = useHeaderHeight()

  return (
    <Header height={headerHeight} className={classes.container}>
      <Group mx="xl" h="100%" position="apart">
        {/* Burger + company name/logo, mobile only */}
        <MediaQuery largerThan={breakpoint} styles={{ display: 'none' }}>
          <Flex align="center" gap="md">
            <ToggleMenuButton />
            <TextLogo />
          </Flex>
        </MediaQuery>
        {/* navigation breadcrumbs. desktop only */}
        <MediaQuery smallerThan={breakpoint} styles={{ display: 'none' }}>
          <BreadCrumbsNav />
        </MediaQuery>


        <Group>
          {/*
            * conditional searchbox.
            * for now even if shown is disabled since it doesn't do anything.
            * We may also want to show it in the navbar instead of the header.
            * or even just use the spotlight for search and keyboard navigation.
            */}
          {showSearch && (
            <MediaQuery smallerThan={breakpoint} styles={{ display: 'none' }}>
              <SearchBox disabled />
            </MediaQuery>
          )}
          {/* Small user avatar w/ user menu. only shows on mobile */}
          <MediaQuery largerThan={breakpoint} styles={{ display: 'none' }}>
            <UserMenu position="bottom-end" width={250}>
              <UnstyledButton>
                <UserAvatar />
              </UnstyledButton>
            </UserMenu>
          </MediaQuery>
        </Group>
      </Group>
    </Header>
  )
}

export default HeaderComponent
