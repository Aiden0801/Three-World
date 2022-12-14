import {
  Code,
  createStyles,
  Divider,
  Group,
  Image,
  Navbar,
  NavbarProps,
  ScrollArea,
} from '@mantine/core'
import navbarConfiguration from '../../../config/navbar.items'
import { MenuItem } from './MenuItem'
// import { SearchBox } from '../Searchbox'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
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
}
const UserMenu: React.FC<INavbarProps> = ({ currentPage, ...props }) => {
  const { classes } = useStyles()

  return (
    <Navbar p="xs" className={classes.container} {...props}>
      <Group position="apart">
        <Image alt="" src="/logo/Group_157.png" width={72} height="auto" />
        <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
      </Group>
      <Divider my="xl" />
      {/*
        * @dev search does nothing for now.
       commented out the component until we have a reason for it to exist
        */}
      {/* <SearchBox mb="md"/> */}
      <Navbar.Section grow component={ScrollArea}>
        {navbarConfiguration.map((item, index) => (
          <MenuItem key={index} item={item} currentPage={currentPage} />
        ))}
      </Navbar.Section>
    </Navbar>
  )
}
export default UserMenu
