import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { createStyles, Navbar, Group, Code, Image, Button, NavLink, Avatar, TextInput, ActionIcon, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import {
    IconDatabaseImport,
    IconSun,
    IconMoonStars,
    IconLogout,
    IconUserPlus,
    IconScreenShare,
    IconDashboard,
    IconShare,
    IconMessage2,
    IconBuildingCommunity,
    IconBuildingLighthouse,
    IconSettingsAutomation,
    IconKey,
    IconSearch,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        container: {
            backgroundColor: theme.colors.gray[1],
        },
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },
        section: {
            marginLeft: -theme.spacing.md,
            marginRight: -theme.spacing.md,
            marginBottom: theme.spacing.md,

            '&:not(:last-of-type)': {
                borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
                    }`,
            },
        },
        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                    .background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                },
            },
        },
    };
});

const data = [
    { link: './dashboard', label: 'Dashboard', icon: IconDashboard },
    { link: './sessions', label: 'Sessions', icon: IconDatabaseImport },
    { link: '', label: 'User Manage', icon: IconUserPlus },
    { link: '', label: 'Browsers', icon: IconScreenShare },
    // { link: '', label: 'Sessions', icon: IconDatabaseImport },
    // { link: '', label: 'Authentication', icon: Icon2fa },
    // { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function UserMenu({ initialState }) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const { classes, cx } = useStyles();
    const [active, setActive] = useState(initialState);
    const { data: session, status } = useSession()

    const router = useRouter();
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('./')
        }
    }, [status]);
    return (
        <Navbar height={'100vh'} p="md" className={classes.container}>

            <Group className={classes.header} position="apart">
                <Image alt="" src="/logo/Group_157.png" width={70} height={50} />
                <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
            </Group>
            <TextInput
                placeholder="Search"
                size="xs"
                icon={<IconSearch size={12} stroke={1.5} />}
                rightSectionWidth={70}
                rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                mb="sm"
            />
            <Navbar.Section grow calssame={classes.section}>
                <NavLink

                    label="Community"
                    className={classes.link}
                    icon={
                        <IconBuildingCommunity size="20" variant="filled" color="green">
                        </IconBuildingCommunity>
                    }
                />
                <NavLink

                    label="Hacker House"
                    className={classes.link}
                    icon={
                        <IconBuildingLighthouse size="20" variant="filled" color="blue">
                        </IconBuildingLighthouse>
                    }
                />
                <NavLink
                    component='a'
                    label="Landing Page"
                    className={classes.link}
                    description="Additional information"
                    href='/dashboard'
                    active={active == 'dashboard' ? true : false}
                    icon={
                        <IconDashboard size="20" variant="filled" color="royalblue">
                        </IconDashboard>
                    }
                />
                <NavLink

                    className={classes.link}
                    label="Bot Settings"
                    icon={
                        <IconSettingsAutomation size="20" variant="filled" color="indigo ">
                        </IconSettingsAutomation>
                    }
                />
                <NavLink
                    component='a'
                    label="Session"
                    className={classes.link}
                    description="Additional information"
                    href='/sessions'
                    active={active == 'sessions' ? true : false}
                    icon={
                        <IconDatabaseImport size="20" variant="filled" color="red">
                        </IconDatabaseImport>
                    }
                />
                <NavLink
                    component='a'
                    label="Browser"
                    className={classes.link}
                    description="Additional information"
                    href='/browsers'
                    active={active == 'browsers' ? true : false}
                    icon={
                        <IconScreenShare size="20" variant="filled" color="red">
                        </IconScreenShare>
                    }
                />
                <NavLink
                    component='a'
                    label="Launch"
                    className={classes.link}
                    description="Additional information"
                    href='/share'
                    active={active == 'share' ? true : false}
                    icon={
                        <IconShare size="20" variant="filled" color="red">
                        </IconShare>
                    }
                />
                <NavLink

                    className={classes.link}
                    label="Messages"
                    icon={
                        <IconMessage2 size="20" variant="filled" color="blue">
                        </IconMessage2>
                    }
                />
                <NavLink
                    className={classes.link}
                    component='a'
                    label="UserManagement"
                    description="Additional information"
                    href='/user'
                    active={active == 'user' ? true : false}
                    icon={
                        <IconUserPlus size="20" variant="filled" color="blue">
                        </IconUserPlus>
                    }
                />
                <NavLink

                    label="Security"
                    icon={
                        <IconKey size="20" variant="filled" color="black">
                        </IconKey>
                    }
                />
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a> */}
                <a href="#" className={classes.link} onClick={(event) => { event.preventDefault(); signOut({ callbackUrl: 'http://localhost:3000/' }); }}>
                    {session && <Avatar src={session.user.image} alt={session.user.name} style={{ marginRight: "10px" }} />}
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar >
    );
}