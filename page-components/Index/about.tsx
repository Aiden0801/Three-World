import {
  Container,
  Text,
  Image,
  createStyles,
  Card,
  SimpleGrid,
  Flex,
} from '@mantine/core'
import { SectionTitle } from './section-title'

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },
  title: {
    // marginBottom: theme.spacing.xs,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)!important',
    margin: 0,
    lineHeight: '4rem',
  },
}))

export function About() {
  const { classes } = useStyles()

  return (
    <Container size="lg" className={classes.wrapper}>
      <SimpleGrid
        spacing="md"
        breakpoints={[
          { maxWidth: 'sm', cols: 1 },
          { minWidth: 'sm', cols: 2 },
        ]}
      >
        <Card shadow="xl" withBorder={false}>
          <Card.Section p="sm">
            <Flex align="center" justify="space-between" gap="xl" w="100%">
              <SectionTitle className={classes.title}>
                Virtual Professionals
              </SectionTitle>
              <Image
                alt="Mantine"
                src="/logo/vpg-logo-square.png"
                width={70}
                height="auto"
              />
            </Flex>
          </Card.Section>
          <Text my="md">
            We are a team of young and passionate people who are dedicated to
            providing the best quality products and services to our customers.
          </Text>
        </Card>

        <Card shadow="xl" withBorder={false}>
          <Card.Section p="sm">
            <Flex align="center" justify="space-between" gap="xl" w="100%">
              <SectionTitle className={classes.title}>Our mission</SectionTitle>
            </Flex>
          </Card.Section>
          <Text my="md">
            We aim to ensure that every user, regardless of tech experience, can
            be considered a "Virtual Professional," by making advanced virtual
            technology simple and accessible in an increasingly sophisticated
            world
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
