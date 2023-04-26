import {
  IconDatabaseImport,
  IconScreenShare,
  IconShare,
  IconBuildingCommunity,
  IconBuildingLighthouse,
  IconMessage2,
  IconDashboard,
  IconUsers,
  IconAlarm,
  IconBrandDiscord,
  IconBrandGithub,
  IconLayoutDashboard,
  IconFolders,
  Icon3dCubeSphere,
  IconMessageChatbot,
  IconMoneybag,
  IconVideo,
  IconPlane,
} from '@tabler/icons'
import type { NavItem } from '@/types/navbar.item.type'
export type { NavItem }

/**
 * The sub menu items for the "Collaborate" menu.
 * This represents for now only the virtual sessions items.
 */
const collaborateMenu: NavItem[] = [
  {
    label: 'Session',
    // description: 'Manage your sessions',
    icon: IconDatabaseImport,
    href: 'collaborate/sessions',
    match: 'sessions',
  },
  {
    label: 'Browser',
    // description: 'Setup your browsers',
    icon: IconScreenShare,
    href: 'collaborate/browsers',
    match: 'browsers',
  },
  {
    label: 'Launch',
    // description: 'collaborate with your team',
    icon: IconShare,
    href: 'collaborate/share',
    match: 'share',
  },
]
/**
 * Sub menu for the businesses management.
 *
 */
const businessesMenu: NavItem[] = [
  {
    label: 'Landing Pages',
    description: 'Your window to the world',
    icon: IconDashboard,
    href: '/websites',
    match: 'websites',
  },
]
/**
 * The sub menu items for the "Coming soon" menu.
 * All items are disabled.
 */
const comingSoonMenu: NavItem[] = [
  {
    label: 'Community',
    description: 'Manage your community',
    icon: IconBuildingCommunity,
    defaultOpened: true,
    subitems: [
      // this should get filtered out because it's empty
    ],
  },
  {
    label: 'Video Chat',
    // description: 'Video chat with your team',
    icon: IconVideo,
    disabled: true,
  },
  {
    label: 'Hacker House',
    icon: IconBuildingLighthouse,
  },
  {
    label: 'Messages',
    description: 'A message center, just for you',
    icon: IconMessage2,
  },
  {
    label: 'Pro Book',
    icon: IconMoneybag,
    subitems: [],
    match: 'book',
  },
  // { // if this is for the logged user management, it is the settings/profile page
  //   label: 'User Management',
  //   icon: IconUserPlus,
  // },
  // {  // this is going to go into the settings page
  //   label: 'Security',
  //   icon: IconKey,
  // },
].map((item) => ({ ...item, disabled: true }))

/**
 * The main navigation items, including the sub menus.
 */
export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    description: 'Central command',
    icon: IconLayoutDashboard,
    href: '/dashboard',
    // disabled: true,
  },
  {
    label: 'Pro Pack',
    icon: IconBuildingLighthouse,
    description: 'Tools for the pros',
    match: 'pro',
    // disabled: true,
    subitems: [
      {
        label: 'Discord bot',
        description: 'Configure your bot',
        icon: IconMessageChatbot,
        href: 'https://bot.virtualprogalaxy.com',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Projects',
    // description: 'Configure your projects',
    icon: IconFolders,
    // defaultOpened: true,
    subitems: businessesMenu,
  },
  {
    label: 'Collaborate',
    icon: IconUsers,
    // defaultOpened: true,
    subitems: collaborateMenu,
    disabled: true,
  },
  {
    label: 'Virtual Worlds',
    description: 'Virtual experiences',
    icon: Icon3dCubeSphere,
    defaultOpened: true,
    // disabled: true,
    subitems: [
      {
        label: 'Hacker House HQ',
        description: 'The Moon Station',
        icon: IconBuildingLighthouse,
        href: 'http://hackerhousehq.co/',
        target: '_blank',
      },
      {
        label: 'Explore',
        description: 'Fly around',
        icon: IconPlane,
        href: 'http://fly.hackerhousehq.com/',
        target: '_blank',
      }
    ],
  },
  {
    label: 'Coming soon',
    description: 'Sneak peak of the future',
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
  },
]
