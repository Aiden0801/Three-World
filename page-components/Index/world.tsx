import {
  createStyles,
  Container,
  Title,
  Image,
  Group,
  UnstyledButton,
} from '@mantine/core'
import Link from 'next/link'

const useStyles = createStyles((theme) => {
  const dark = theme.colorScheme === 'dark'

  return {
    sectionTitle: {
      fontSize: 52,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      marginBottom: theme.spacing.xl * 1.5,
      color: theme.colors[theme.primaryColor][dark ? 0 : 9],
    },
  }
})

export function Worlds() {
  const { classes, cx } = useStyles()
  return (
    <Container size="lg" mb="xl">
      <Title align="center" className={classes.sectionTitle}>
        Worlds
      </Title>
      <Group position="center">
        <UnstyledButton
          component="a"
          href="https://www.hackerhousehq.com/"
          target="_blank"
          rel="noopener"
        >
          <Image
            src="https://raw.githubusercontent.com/HackerHouseHQ/assets/main/logos/hhhq/Group_157.png"
            alt="Hacker House HQ"
            width="12rem"
            fit="contain"
          />
        </UnstyledButton>
      </Group>
    </Container>
  )
}
