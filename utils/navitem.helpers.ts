import type {
  NavItem,
  LinkNavItem,
  SubNavItem,
} from '../types/navbar.item.type'

export function isLinkItem(item: NavItem): item is LinkNavItem {
  return 'href' in item
}

export function isWithMenu(item: NavItem): item is SubNavItem {
  return 'subitems' in item && item.subitems.length > 0
}

/**
 * Check if the item is active based on the current page
 * against the item's `match` property.
 * @returns true if the item is active
 */
export function isActive(
  item: NavItem,
  currentPage: string | undefined
): boolean {
  if (isLinkItem(item)) {
    if (typeof item.match === 'string') {
      return currentPage === item.match
    }
    return item.match?.includes(currentPage)
  }
  return false
}
