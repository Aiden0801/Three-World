import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Box,
  Flex,
  Stack,
  Mark,
  Code,
  Divider,
} from '@mantine/core'
import Link from 'next/link'
import { Dots } from './dots'
// TODO: Cleanup classes
// @dev these come directly from the mantine example for now, but we changed
// the component structure, so there are some stuff that we don't know
const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    [theme.fn.smallerThan('md')]: {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: `clamp(${theme.fontSizes.xl * 3}px, 6vw, 8rem )`,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.fontSizes.xl * 2,
      textAlign: 'left',
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}))

export function Hero() {
  const { classes } = useStyles()

  return (
    <Container className={classes.wrapper} size="xl">
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 180 }} />
      <Dots className={classes.dots} style={{ right: 60, top: 180 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Virtual{' '}
          <Text component="span" className={classes.highlight} inherit>
            Pro
          </Text>{' '}
          Galaxy
        </Title>

        <Container p={0} size={600}>
          <Text size="sm" color="dimmed" className={classes.description}>
            A collection of worlds with virtual tools, for Groups, Communities,
            Businesses, Events, and Opportunities, built using Blockchain
            Technology, allowing for secure web operations, user-transactions
            and seamless integration with all Metaverses.
          </Text>
        </Container>
        <Container size="sm" className={classes.controls} mt="3rem">
          <Flex
            gap="xs"
            // @ts-ignore - base direction says oopsie, but it works.
            direction={{ base: 'column', sm: 'row' }}
            w="100%"
            justify="center"
            align="stretch"
          >
            <Text
              component={Code}
              // align=
              sx={(theme) => ({
                fontFamily: 'monospace',
                flex: 1,
                lineHeight: 4,
                textAlign: 'center',
                [theme.fn.largerThan('sm')]: {
                  textAlign: 'right',
                },
              })}
              px="xl"
            >
              $ exit-world
              {/* &gt; exit-world */}
            </Text>
            <Link href="#" passHref>
              <Button
                className={classes.control}
                size="xl"
                uppercase
                variant="filled"
                radius="sm"
                // fullWidth
                sx={(theme) => ({
                  fontFamily: 'monospace',
                  flex: 2,
                  minHeight: theme.spacing.xl * 3,
                })}
              >
                Enter Galaxy
              </Button>
            </Link>
          </Flex>
        </Container>
      </div>
    </Container>
  )
}
