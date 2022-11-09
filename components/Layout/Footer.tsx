import {
   createStyles,
   Container,
   Group,
   ActionIcon,
   Footer,
   Box,
} from '@mantine/core'
import {
   IconBrandTwitter,
   IconBrandYoutube,
   IconBrandInstagram,
} from '@tabler/icons'
import { MantineLogo } from '@mantine/ds'
import Image from 'next/image'
const useStyles = createStyles((theme) => ({
   footer: {
      bottom: 0,
      marginTop: 10,
      borderTop: `1px solid ${
         theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[2]
      }`,
   },

   inner: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',

      // [theme.fn.smallerThan('xs')]: {
      //    flexDirection: 'column',
      // },
   },
}))

export default function FooterComp() {
   const { classes } = useStyles()

   return (
      <Box
         style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
         }}>
         <Footer
            height={50}
            className={classes.footer}
            style={{
               backgroundColor: 'rgba(0, 0, 0, 0)',
            }}>
            <Container className={classes.inner}>
               <Image alt="" src="/logo/Group_157.png" width="30" height="20" />
               <Group spacing={0} position="right" noWrap>
                  <ActionIcon size="lg">
                     <IconBrandTwitter size={12} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon size="lg">
                     <IconBrandYoutube size={12} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon size="lg">
                     <IconBrandInstagram size={12} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </Container>
         </Footer>
      </Box>
   )
}
