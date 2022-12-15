import Link from 'next/link'
import {
  createStyles,
  MantineTheme,
  NavLink,
  NavLinkProps,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core'
import { LinkNavItem, NavItem, SubNavItem } from '@/types/navbar.item.type'
import { isActive, isLinkItem } from '@/utils/navitem.helpers'
import { ConditionalWrapper } from '@/components/ConditionalWrapper'

type MenuItemProps = {
  item: NavItem
  currentPage: string
} & NavLinkProps

const useStyles = createStyles((theme, params) => {
  const { colors } = theme
  const primary = theme.colors[theme.primaryColor]
  const borderColor =
    // theme.colorScheme === 'dark' ? colors.dark[4] : colors.gray[3]
    theme.colorScheme === 'dark' ? primary[3] : primary[6]
  return {
    control: {
      transition: 'all 150ms ease-out',
      '&>*': {
        transition: 'all 150ms ease-out',
      },
      // display: 'block',
      color: theme.colorScheme === 'dark' ? colors.dark[0] : theme.black,
      '&:hover': {
        borderRadius: theme.radius.md,
        // borderTopLeftRadius: 0,
        // borderBottomLeftRadius: 0,
        backgroundColor:
          theme.colorScheme === 'dark' ? colors.dark[5] : colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
    subitem: {
      borderLeft: `1px solid ${borderColor}`,
      '&:hover': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    iconWrapper: {
      // height: '100%',
      // display: 'flex',
      // placeItems: 'center',
    }
  }
})

/**
 * Menu Item component with conditional Link wrapper and recursive subitems
 * in case we have a menu item with subitems
 */
export function MenuItem({ item, currentPage, ...rest }: MenuItemProps) {
  const active = isActive(item, currentPage)
  const { classes, cx } = useStyles()

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
        my="xs"
        variant="light"
        childrenOffset="xl"
        {...rest}
        label={item.label}
        description={item.description}
        disabled={item.disabled}
        defaultOpened={(item as SubNavItem).defaultOpened}
        active={active}
        icon={<ItemIcon item={item} active={active} />}
        classNames={{
          root: cx(rest.className, classes.control),
          icon: cx(classes.iconWrapper),
        }}
      >
        {(item as SubNavItem).subitems?.map((child, index) => (
          <MenuItem
            key={index}
            item={child}
            mr="-sm"
            my={0}
            currentPage={currentPage}
            className={classes.subitem}
          />
        ))}
      </NavLink>
    </ConditionalWrapper>
  )
}

function ItemIcon({ item, active }: { item: NavItem; active: boolean }) {
  const theme = useMantineTheme()
  const iconColor = getIconColor(item, active, theme)
  const iconVariant = item.disabled ? 'default' : !active ? 'light' : 'filled'
  return item.icon ? (
    <ThemeIcon radius="sm" color={iconColor} variant={iconVariant}>
      <item.icon size={18} stroke={1.5} />
    </ThemeIcon>
  ) : (
    <></>
  )
}

function getIconColor(item: NavItem, active: boolean, theme: MantineTheme) {
  const { primaryColor, colors, colorScheme } = theme
  const primary = colors[primaryColor]
  const dark = colorScheme === 'dark'

  const activeColors = active ? primary[6] : primary[dark ? 9 : 1]

  return item.disabled ? colors.gray[6] : activeColors
}
