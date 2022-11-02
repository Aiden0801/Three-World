import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Burger,
  Avatar,
  Image,
} from '@mantine/core';

import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';


import { signIn, signOut, useSession } from 'next-auth/react'
const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },
  button: {

  },
  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));


export default function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const { data: session, status } = useSession()
  return (
    <Box pb={20}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }}>
      <Header height={60} px="md"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
      >
        <Group position="apart" sx={{ height: '100%' }}>

          <Image alt="" src="/logo/Group_157.png" width={70} height={50} />


          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Features
            </a>
            <a href="#" className={classes.link}>
              Contact US
            </a>
          </Group>

          {!session && <><Group className={classes.hiddenMobile}>
            {/* <Button component="a" href="/auth/login" variant="default" className={classes.button}>Log in</Button> */}
            <Button component="a" href="/login" variant="default" className={classes.button}>Log in</Button>
          </Group></>}

          {session && <><Group className={classes.hiddenMobile}>
            <Avatar src={session.user.image} alt={session.user.email} />
            <Button onClick={() => { signOut(); }} className={classes.button} >Log out</Button>
          </Group></>}

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>
    </Box >
  );
}