import {
  Code,
  createStyles,
  Divider,
  Group,
  Image,
  Navbar,
  NavbarProps,
  NavLink,
  NavLinkProps,
  ScrollArea,
} from '@mantine/core'
import Link from 'next/link'
import navbarConfiguration, { NavItem } from '../../config/navbar.items'
import { LinkNavItem, SubNavItem } from '../../types/navbar.item.type'
import { isActive, isLinkItem } from '../../utils/navitem.helpers'
import { ConditionalWrapper } from '../ConditionalWrapper'
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
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      // alignItems: 'center',
      placeItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[1],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
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
  const { classes, cx } = useStyles()

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

type MenuItemProps = {
  item: NavItem
  currentPage: string
} & NavLinkProps

/**
 * Menu Item component with conditional Link wrapper and recursive subitems
 * in case we have a menu item with subitems
 */
function MenuItem({ item, currentPage, ...rest }: MenuItemProps) {
  const active = isActive(item, currentPage)

  return (
    <ConditionalWrapper
      condition={isLinkItem(item)}
      wrapper={(children) => (
        <Link href={(item as LinkNavItem).href} passHref>
          {children}
        </Link>
      )}
    >
      <NavLink
        variant="subtle"
        label={item.label}
        description={item.description}
        active={active}
        icon={item.icon && <item.icon stroke={1.5} />}
        disabled={item.disabled}
        defaultOpened={(item as SubNavItem).defaultOpened}
        {...rest}
      >
        {(item as SubNavItem).subitems?.map((child, index) => (
          <MenuItem key={index} item={child} currentPage={currentPage} />
        ))}
      </NavLink>
    </ConditionalWrapper>
  )
}
