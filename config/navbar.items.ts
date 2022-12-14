import {
  IconDatabaseImport,
  IconScreenShare,
  IconShare,
  IconBuildingCommunity,
  IconBuildingLighthouse,
  IconMessage2,
  IconUserPlus,
  IconKey,
  IconSettingsAutomation,
  IconDashboard,
  IconUsers,
  IconAlarm,
  IconBrandDiscord,
  IconBrandGithub,
} from '@tabler/icons'
import type { NavItem } from '../types/navbar.item.type'
export type { NavItem }

/**
 * The sub menu items for the "Collaborate" menu.
 * This represents for now only the virtual sessions items.
 */
const collaborateMenu: NavItem[] = [
  {
    label: 'Session',
    description: 'Manage your sessions',
    icon: IconDatabaseImport,
    href: '/sessions',
    match: 'sessions',
  },
  {
    label: 'Browser',
    description: 'Setup your browsers',
    icon: IconScreenShare,
    href: '/browsers',
    match: 'browsers',
  },
  {
    label: 'Launch',
    description: 'collaborate with your team',
    icon: IconShare,
    href: '/share',
    match: 'share',
  },
]
/**
 * The sub menu items for the "Coming soon" menu.
 * All items are disabled.
 */
const comingSoonMenu: NavItem[] = [
  {
    label: 'Community',
    icon: IconBuildingCommunity,
  },
  {
    label: 'Hacker House',
    icon: IconBuildingLighthouse,
  },
  {
    label: 'Messages',
    icon: IconMessage2,
  },
  {
    label: 'User Management',
    icon: IconUserPlus,
  },
  {
    label: 'Security',
    icon: IconKey,
  },
  {
    label: 'Bot Settings',
    icon: IconSettingsAutomation,
  },
].map((item) => ({ ...item, disabled: true }))

/**
 * The main navigation items, including the sub menus.
 */
export const navItems: NavItem[] = [
  {
    label: 'Your Landing Pages',
    description: 'Configure your landing pages',
    icon: IconDashboard,
    href: '/dashboard',
    match: 'dashboard',
  },
  {
    label: 'Collaborate',
    icon: IconUsers,
    defaultOpened: true,
    subitems: collaborateMenu,
  },
  {
    label: 'Coming soon',
    icon: IconAlarm,
    subitems: comingSoonMenu,
  },
]

export default navItems

/**
 * The navbar footer links.
 */
export const navFooterLinks = [
  {
    icon: IconBrandDiscord,
    // unlimited invite to HHHQ discord server, start-here channel
    href: 'https://discord.gg/pgA8uCV2sy',
    label: 'Discord',
    target: '_blank',
  },
  {
    icon: IconBrandGithub,
    href: 'https://github.com/hackerhousehq',
    label: 'GitHub',
  }
]
