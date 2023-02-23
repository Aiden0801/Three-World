import type { TablerIcon } from "@tabler/icons"
import { HTMLAttributeAnchorTarget } from "react"

/**
 * Base common properties of all NavItems
 */
type BaseNavItem = {
  label: string
  description?: string
  icon: TablerIcon
  disabled?: boolean
}

/**
 * NavItem with a link.
 */
export type LinkNavItem = BaseNavItem & {
  href: string
/** used to match `currentPage` for the active link status */
  match: string | string[]
  target?: HTMLAttributeAnchorTarget
}

/**
 * NavItem with a sub menu
 */
export type SubNavItem = BaseNavItem & {
  subitems: NavItem[]
/** used by NavLink with sub items */
  defaultOpened?: boolean
}
/**
  * NavItem is a union of all possible types
  * @dev this should actually be a union (not an intersection) to help
  * with type safety in the configuration, but for now it breaks the
  * NavItem component in the Navbar component, so we'll leave it as is.
  * TODO: update this type to be a union
 */
export type NavItem =
  | BaseNavItem
  | LinkNavItem
  | SubNavItem
