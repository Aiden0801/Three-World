import Link from "next/link"
import { NavLink, NavLinkProps } from "@mantine/core"
import { LinkNavItem, NavItem, SubNavItem } from "../../../types/navbar.item.type"
import { isActive, isLinkItem } from "../../../utils/navitem.helpers"
import { ConditionalWrapper } from "../../ConditionalWrapper"

type MenuItemProps = {
  item: NavItem
  currentPage: string
} & NavLinkProps

/**
 * Menu Item component with conditional Link wrapper and recursive subitems
 * in case we have a menu item with subitems
 */
export function MenuItem({ item, currentPage, ...rest }: MenuItemProps) {
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
        // variant="subtle"
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
