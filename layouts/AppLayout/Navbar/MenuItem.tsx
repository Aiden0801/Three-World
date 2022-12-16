import Link from 'next/link'
import {
  createStyles,
  MantineTheme,
  NavLink,
  NavLinkProps,
  ThemeIcon,
  ThemeIconVariant,
  useMantineTheme,
} from '@mantine/core'
import { LinkNavItem, NavItem, SubNavItem } from '@/types/navbar.item.type'
import { isActive, isLinkItem, isWithMenu } from '@/utils/navitem.helpers'
import { ConditionalWrapper } from '@/components/ConditionalWrapper'
import { useState } from 'react'

type MenuItemProps = {
  item: NavItem
  currentPage: string
} & NavLinkProps

const useStyles = createStyles(
  (theme, { item, active }: { item: NavItem; active: boolean }) => {
    const { colors } = theme
    const primary = theme.colors[theme.primaryColor]
    const borderColor = theme.colorScheme === 'dark' ? primary[3] : primary[6]

    const baseSubItemShadow = `-1px 0 0 0 ${
      item.disabled ? colors.gray[2] : borderColor
    }`
    const extendedSubItemShadow = `-${theme.spacing.xs}px 0 0 0 ${
      item.disabled ? colors.gray[2] : borderColor
    }`

    return {
      control: {
        transition: 'all 150ms ease-out',
        '&>*': {
          transition: 'all 150ms ease-out',
        },
        color: theme.colorScheme === 'dark' ? colors.dark[0] : theme.black,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? colors.dark[5] : colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
      opened: {
        backgroundColor:
          theme.colorScheme === 'dark' ? colors.dark[7] : colors.gray[3],
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      subitem: {
        boxShadow: active ? extendedSubItemShadow : baseSubItemShadow,
        backgroundColor:
          theme.colorScheme === 'dark' ? colors.dark[8] : colors.gray[2],
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,

        '&:hover': {
          boxShadow: extendedSubItemShadow,
        },
      },
    }
  }
)

/**
 * Menu Item component with conditional Link wrapper and recursive subitems
 * in case we have a menu item with subitems
 */
export function MenuItem({ item, currentPage, ...rest }: MenuItemProps) {
  const active = isActive(item, currentPage)
  const [opened, setOpened] = useState(
    isWithMenu(item) ? item.defaultOpened : false
  )

  const { classes, cx } = useStyles({ item, active })
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
        variant="light"
        childrenOffset="xl"
        {...rest}
        label={item.label}
        description={item.description}
        disabled={item.disabled}
        defaultOpened={(item as SubNavItem).defaultOpened}
        active={active}
        onChange={(opened) => setOpened(opened)}
        opened={opened}
        icon={<ItemIcon item={item} active={active} />}
        classNames={{
          root: cx(rest.className, classes.control, opened && classes.opened),
          // icon: cx(classes.iconWrapper),
        }}
      >
        {isWithMenu(item)
          ? item.subitems?.map((child, index) => (
              <MenuItem
                key={index}
                item={child}
                mr="-sm"
                // mt={1}
                currentPage={currentPage}
                className={classes.subitem}
              />
            ))
          : null}
      </NavLink>
    </ConditionalWrapper>
  )
}

function ItemIcon({ item, active }: { item: NavItem; active: boolean }) {
  const theme = useMantineTheme()
  const iconColor = getIconColor(item, active, theme)
  const iconVariant: ThemeIconVariant = item.disabled
    ? 'default'
    : !active
    ? 'light'
    : 'filled'
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
