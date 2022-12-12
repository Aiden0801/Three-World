import { Button, Container, createStyles, Group, Text } from '@mantine/core'
import { GithubIcon } from '@mantine/ds'
import React from 'react'
import { FeaturesCards } from '../../components/LandingPage/Features'
import Link from 'next/link'
const BREAKPOINT = '@media (max-width: 755px)'

const useStyles = createStyles((theme) => ({
   inner: {
      position: 'relative',
      paddingTop: 200,
      paddingBottom: 420,

      [BREAKPOINT]: {
         paddingBottom: 80,
         paddingTop: 80,
      },
   },

   title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 62,
      fontWeight: 900,
      lineHeight: 1.1,
      margin: 0,
      padding: 0,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [BREAKPOINT]: {
         fontSize: 42,
         lineHeight: 1.2,
      },
   },

   description: {
      marginTop: theme.spacing.xl,
      fontSize: 24,

      [BREAKPOINT]: {
         fontSize: 18,
      },
   },

   controls: {
      marginTop: theme.spacing.xl * 2,

      [BREAKPOINT]: {
         marginTop: theme.spacing.xl,
      },
   },

   control: {
      height: 54,
      paddingLeft: 38,
      paddingRight: 38,

      [BREAKPOINT]: {
         height: 54,
         paddingLeft: 18,
         paddingRight: 18,
         flex: 1,
      },
   },
}))

const LandingCard: React.FC = () => {
   const { classes } = useStyles()
   return (
      <Container size={700} className={classes.inner}>
         <h1 className={classes.title}>
            A{' '}
            <Text
               component="span"
               variant="gradient"
               gradient={{ from: 'blue', to: 'cyan' }}
               inherit>
               fully featured
            </Text>{' '}
            Communication World
         </h1>

         <Text className={classes.description} color="dimmed">
            Feel free to communicate each other - sharing computer browsers.
         </Text>

         <Group className={classes.controls}>
            <Button
               component={Link}
               size="xl"
               className={classes.control}
               variant="gradient"
               gradient={{ from: 'blue', to: 'cyan' }}
               href="/login">
               Get started
            </Button>

            <Button
               component="a"
               href="https://github.com/Aiden0801/Three-World"
               size="xl"
               variant="default"
               className={classes.control}
               leftIcon={<GithubIcon size={20} />}>
               GitHub
            </Button>
         </Group>
      </Container>
   )
}
export default LandingCard
