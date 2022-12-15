import {
  createStyles,
  Group,
  Header,
  MediaQuery,
  Text,
  Title,
} from '@mantine/core'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle'
import UserAvatar from './UserAvatar'
import { ToggleMenuButton } from '@/components/ToggleMenuButton'
import { useMobileBreakpoint } from '@/contexts/AppLayout'
import { TextLogo } from '../Logo'

const useStyles = createStyles((theme, _params) => {
  return {
    container: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  }
})
/**
 * Header component for the main layout.
 * Contains the logo, search box, color scheme toggle, and user avatar.
 * @deprecated in favor of a slimmer navbar with all the same stuff
 */
const HeaderComponent = () => {
  const { classes } = useStyles()
  const breakpoint = useMobileBreakpoint()
  return (
    <Header height={{ base: 50, md: 70 }} className={classes.container}>
      <Group mx="xl" h="100%" position="apart">
        <Group>
          <MediaQuery largerThan={breakpoint} styles={{ display: 'none' }}>
            <ToggleMenuButton />
          </MediaQuery>
          <TextLogo />
        </Group>
        <MediaQuery smallerThan={breakpoint} styles={{ display: 'none' }}>
          <Group>
            {/* <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <SearchBox />
          </MediaQuery> */}
            <ColorSchemeToggle />
            {/* <Indicator withBorder color="pink" mt="sm">
            <IconBell size={20} color="white" />
          </Indicator> */}
            <UserAvatar />
          </Group>
        </MediaQuery>
      </Group>
    </Header>
  )
}

export default HeaderComponent
