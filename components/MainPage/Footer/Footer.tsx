import {
   createStyles,
   Container,
   Group,
   ActionIcon,
   Footer,
   Image,
} from '@mantine/core'
import {
   IconBrandGithub,
   IconBrandDiscord,
   IconBrandYoutube,
   IconBrandInstagram,
} from '@tabler/icons'
import { MantineLogo } from '@mantine/ds'

import { serverURL } from '../../../config/urlcontrol'
const useStyles = createStyles((theme) => ({
   footer: {
      borderTop: `1px solid ${
         theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[2]
      }`,
   },

   inner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing.sm,

      [theme.fn.smallerThan('xs')]: {
         flexDirection: 'column',
      },
   },

   links: {},
}))
export default function FooterComponent() {
   const { classes } = useStyles()

   return (
      <Footer height={50} className={classes.footer}>
         <Container ml="xl" fluid className={classes.inner}>
            <Group
               spacing={0}
               className={classes.links}
               position="right"
               noWrap>
               <Image
                  src={`${serverURL}/logo/logo.svg`}
                  alt="logo"
                  width={40}
                  height={40}
               />
               <ActionIcon size="lg">
                  <IconBrandGithub size={18} stroke={1.5} />
               </ActionIcon>
               <ActionIcon size="lg">
                  <IconBrandDiscord size={18} stroke={1.5} />
               </ActionIcon>
               <ActionIcon size="lg">
                  <IconBrandInstagram size={18} stroke={1.5} />
               </ActionIcon>
            </Group>
         </Container>
      </Footer>
   )
}
