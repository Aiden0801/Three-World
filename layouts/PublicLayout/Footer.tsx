import {
  ActionIcon,
  Container,
  createStyles,
  Group,
  Text,
} from '@mantine/core'
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons'
import Image from 'next/image'

const useStyles = createStyles((theme) => ({
  footer: {
    // paddingTop: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    // borderTop: `1px solid ${
    //   theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    // }`,
    // width: `calc(100vw - ${theme.spacing.md * 2}px)`,
    left: 0,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    // borderTop: `1px solid ${
    //   theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    // }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}))

const data = [
  {
    title: 'About',
    links: [
      {
        label: 'Features',
        link: '',
      },
      {
        label: 'Pricing',
        link: '',
      },
    ],
  },
]
export default function Footer() {
  const { classes } = useStyles()

  return (
    <footer className={classes.footer}>
      {/* <TopSection/> */}
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2022 Virtual Professionals. All rights reserved.
        </Text>
        <SocialButtons />
      </Container>
    </footer>
  )
}

function TopSection() {
  const { classes } = useStyles()

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ))

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    )
  })
  return (
    <Container className={classes.inner}>
      <div className={classes.logo}>
        <Image alt="" src="/logo/Group_157.png" width={70} height={50} />
        <Text size="xs" color="dimmed" className={classes.description}>
          Build fully functional accessible web applications faster than ever
        </Text>
      </div>
      <div className={classes.groups}>{groups}</div>
    </Container>
  )
}

function SocialButtons() {
  const { classes } = useStyles()

  return (
    <Group spacing={0} className={classes.social} position="right" noWrap>
      <ActionIcon
        size="lg"
        component="a"
        href="https://twitter.com/vpgalaxy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconBrandTwitter size={18} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        size="lg"
        component="a"
        href="https://www.instagram.com/virtualprogalaxy/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconBrandInstagram size={18} stroke={1.5} />
      </ActionIcon>
    </Group>
  )
}
