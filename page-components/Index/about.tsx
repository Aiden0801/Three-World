import {
  Container,
  ActionIcon,
  Text,
  Title,
  Image,
  createStyles,
  Card,
  SimpleGrid,
  Flex,
} from '@mantine/core'
import { IconBrandTwitter, IconBrandYoutube } from '@tabler/icons'
import { SectionTitle } from './section-title'

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
    marginRight: theme.spacing.md,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  description: {
    marginBottom: theme.spacing.md,
  },
  social: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export function About() {
  const { classes } = useStyles()
  return (
    <Container size="xl" className={classes.wrapper}>
      <SimpleGrid
        spacing="md"
        breakpoints={[
          { maxWidth: 'xs', cols: 1 },
          { minWidth: 'xs', cols: 2 },
        ]}
      >
        <Card className={classes.inner}>
          <div className={classes.content}>
            <Flex align="center" justify="space-between" gap="xl">
              <Image
                alt="Mantine"
                src="/logo/vpg-logo-square.png"
                width={70}
                height="auto"
              />
            <SectionTitle sx={{ fontSize: '1.6rem', margin: 0, lineHeight: '4rem' }}>
              Virtual Professionals
            </SectionTitle>
            </Flex>
            <Text className={classes.description}>
              We are a team of young and passionate people who are dedicated to
              providing the best quality products and services to our customers.
            </Text>
          </div>
        </Card>
        <Card sx={{display: 'flex', placeItem: 'center'}}>
          <Flex direction="column" align="center" justify="space-betwwn">
            <SectionTitle sx={{ fontSize: '1.6rem', margin: 0, lineHeight: '4rem' }}>Our mission</SectionTitle>
            <Text className={classes.description}>
              We aim to ensure that every user, regardless of tech experience,
              can be considered a "Virtual Professional," by making advanced
              virtual technology simple and accessible in an increasingly
              sophisticated world
            </Text>
          </Flex>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
