import {
   Code,
   createStyles,
   Group,
   Image,
   Navbar,
   NavLink,
   TextInput,
   useMantineColorScheme,
   useMantineTheme,
} from '@mantine/core'
import {
   IconBuildingCommunity,
   IconBuildingLighthouse,
   IconDashboard,
   IconDatabaseImport,
   IconKey,
   IconMessage2,
   IconScreenShare,
   IconSearch,
   IconSettingsAutomation,
   IconShare,
   IconUserPlus,
} from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
const useStyles = createStyles((theme, _params, getRef) => {
   const icon = getRef('icon')
   return {
      container: {
         backgroundColor:
            theme.colorScheme === 'dark'
               ? theme.colors.dark[6]
               : theme.colors.gray[0],
         boxShadow: `3px 0px 5px ${theme.colors.gray[1]}`,
      },
      header: {
         paddingBottom: theme.spacing.md,
         marginBottom: theme.spacing.md * 1.5,
      },
      section: {
         marginLeft: -theme.spacing.md,
         marginRight: -theme.spacing.md,
         marginBottom: theme.spacing.md,

         '&:not(:last-of-type)': {
            borderBottom: `1px solid ${
               theme.colorScheme === 'dark'
                  ? theme.colors.dark[4]
                  : theme.colors.gray[3]
            }`,
         },
      },
      footer: {
         paddingTop: theme.spacing.md,
         marginTop: theme.spacing.md,
         borderTop: `1px solid ${
            theme.colorScheme === 'dark'
               ? theme.colors.dark[4]
               : theme.colors.gray[2]
         }`,
      },

      link: {
         ...theme.fn.focusStyles(),
         display: 'flex',
         alignItems: 'center',
         textDecoration: 'none',
         fontSize: theme.fontSizes.sm,
         color:
            theme.colorScheme === 'dark'
               ? theme.colors.dark[1]
               : theme.colors.gray[7],
         padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
         borderRadius: theme.radius.sm,
         fontWeight: 500,

         '&:hover': {
            backgroundColor:
               theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${icon}`]: {
               color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
         },
      },

      linkIcon: {
         ref: icon,
         color:
            theme.colorScheme === 'dark'
               ? theme.colors.dark[2]
               : theme.colors.gray[6],
         marginRight: theme.spacing.sm,
      },

      linkActive: {
         '&, &:hover': {
            backgroundColor: theme.fn.variant({
               variant: 'light',
               color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
               variant: 'light',
               color: theme.primaryColor,
            }).color,
            [`& .${icon}`]: {
               color: theme.fn.variant({
                  variant: 'light',
                  color: theme.primaryColor,
               }).color,
            },
         },
      },
   }
})
interface INavbarProps extends React.PropsWithChildren {
   initialState?: string
   hidden?: any
   hiddenBreakpoint?: any
   width?: any
}
const UserMenu: React.FC<INavbarProps> = ({ initialState, ...props }) => {
   const { colorScheme, toggleColorScheme } = useMantineColorScheme()
   const theme = useMantineTheme()
   const { classes, cx } = useStyles()
   const router = useRouter()
   return (
      <Navbar p="md" className={classes.container} {...props}>
         <Group className={classes.header} position="apart">
            <Image alt="" src="/logo/Group_157.png" width={80} height={50} />
            <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
         </Group>
         <TextInput
            placeholder="Search"
            size="xs"
            icon={<IconSearch size={12} stroke={1.5} />}
            rightSectionWidth={70}
            rightSection={<Code>Ctrl + K</Code>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            mb="sm"
         />
         <Navbar.Section grow className={classes.section}>
            <NavLink
               label="Community"
               className={classes.link}
               icon={
                  <IconBuildingCommunity
                     size="20"
                     color="green"></IconBuildingCommunity>
               }
            />
            <NavLink
               label="Hacker House"
               className={classes.link}
               icon={
                  <IconBuildingLighthouse
                     size="20"
                     color="blue"></IconBuildingLighthouse>
               }
            />
            <NavLink
               label="Landing Page"
               className={classes.link}
               description="Additional information"
               active={initialState == 'dashboard' ? true : false}
               onClick={() => {
                  router.push('/dashboard')
               }}
               icon={
                  <IconDashboard size="20" color="royalblue"></IconDashboard>
               }></NavLink>
            <NavLink
               className={classes.link}
               label="Bot Settings"
               icon={
                  <IconSettingsAutomation
                     size="20"
                     color="indigo "></IconSettingsAutomation>
               }
            />
            <NavLink
               label="Session"
               className={classes.link}
               description="Additional information"
               onClick={() => {
                  router.push('/sessions')
               }}
               active={initialState == 'sessions' ? true : false}
               icon={
                  <IconDatabaseImport
                     size="20"
                     color="red"></IconDatabaseImport>
               }
            />
            <NavLink
               label="Browser"
               className={classes.link}
               description="Additional information"
               onClick={() => {
                  router.push('/browsers')
               }}
               active={initialState == 'browsers' ? true : false}
               icon={<IconScreenShare size="20" color="red"></IconScreenShare>}
            />
            <NavLink
               label="Launch"
               className={classes.link}
               description="Additional information"
               onClick={() => {
                  router.push('/share')
               }}
               active={initialState == 'share' ? true : false}
               icon={<IconShare size="20" color="red"></IconShare>}
            />
            <NavLink
               className={classes.link}
               label="Messages"
               icon={<IconMessage2 size="20" color="blue"></IconMessage2>}
            />
            <NavLink
               className={classes.link}
               label="UserManagement"
               description="Additional information"
               active={initialState == 'user' ? true : false}
               icon={<IconUserPlus size="20" color="blue"></IconUserPlus>}
            />
            <NavLink
               label="Security"
               icon={<IconKey size="20" color="black"></IconKey>}
            />
         </Navbar.Section>
      </Navbar>
   )
}
export default UserMenu
