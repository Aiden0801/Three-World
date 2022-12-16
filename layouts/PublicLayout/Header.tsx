import {
  Anchor,
  Burger,
  createStyles,
  Group,
  Header,
  Paper,
  Stack,
  Transition,
} from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import { useDisclosure } from '@mantine/hooks'
import { LinkButton } from '../../components/Button'

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
    // flex: 1,
    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },
  button: {},
  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
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
}))

export default function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false)
  const { classes } = useStyles()
  return (
    <Header height={60}>
      <Group position="apart" sx={{ height: '100%' }} px="xl">
        <Image alt="" src="/logo/Group_157.png" width={70} height={50} />

        <Group
          sx={{ height: '100%' }}
          spacing={0}
          className={classes.hiddenMobile}
        >
          <MenuItems className={classes.link} />
        </Group>

        <>
          <Group className={classes.hiddenMobile}>
            <LinkButton href="/login">Log In</LinkButton>
          </Group>
        </>

        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          className={classes.hiddenDesktop}
        />

        <Transition
          transition="pop-top-right"
          duration={200}
          mounted={drawerOpened}
        >
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <Stack>
                <MenuItems className={classes.link} />
                <LinkButton
                  variant="default"
                  className={classes.button}
                  href="/login"
                >
                  Log in
                </LinkButton>
              </Stack>
            </Paper>
          )}
        </Transition>
      </Group>
    </Header>
  )
}

/**
 * Menu items for both desktop and mobile navigation.
 * TODO: Use a config array to generate these items.
 * Also for now these don't point anywhere, so we might want to either
 * remove the href or add the target pages.
 */
function MenuItems({ className }: { className?: string }) {
  return (
    <>
      <Link target="_self" href="#" passHref>
        <Anchor className={className}>Home</Anchor>
      </Link>
      <Link target="_self" href="#" passHref>
        <Anchor className={className}>Features</Anchor>
      </Link>
      <Link target="_self" href="#" passHref>
        <Anchor className={className}>Pricing</Anchor>
      </Link>
      <Link target="_self" href="#" passHref>
        <Anchor className={className}>About</Anchor>
      </Link>
      <Link target="_self" href="#" passHref>
        <Anchor className={className}>Contact US</Anchor>
      </Link>
    </>
  )
}