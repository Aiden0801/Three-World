import { ActionIcon, Container, createStyles, Group, Text } from '@mantine/core'
import {
   IconBrandInstagram,
   IconBrandTwitter,
   IconBrandYoutube,
} from '@tabler/icons'
import Image from 'next/image'
const useStyles = createStyles((theme) => ({
   footer: {
      paddingTop: theme.spacing.xl * 2,
      backgroundColor:
         theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      borderTop: `1px solid ${
         theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[2]
      }`,
      width: `calc(100vw - ${theme.spacing.md * 2}px)`,
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
      marginTop: theme.spacing.xl,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
         theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
      }`,

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

// interface FooterLinksProps {
//    data: {
//       title: string
//       links: { label: string; link: string }[]
//    }[]
// }
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
   // { data }: FooterLinksProps
   const { classes } = useStyles()

   // const [scroll, scrollTo] = useWindowScroll()
   // const { ref, width, height: eheight } = useElementSize()
   // const { height: vheight, width: vwidth } = useViewportSize()
   const groups = data.map((group) => {
      const links = group.links.map((link, index) => (
         <Text<'a'>
            key={index}
            className={classes.link}
            component="a"
            href={link.link}
            onClick={(event) => event.preventDefault()}>
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
      <footer
         className={classes.footer}
         style={
            {
               // bottom:
               // position:
               //    typeof window !== 'undefined' &&
               //    document.documentElement.scrollHeight -
               //       (document.documentElement.scrollTop + vheight) <
               //       vheight
               //       ? 'fixed'
               //       : 'static',
               // bottom:
               //    typeof window !== 'undefined'
               //       ? `-${
               //            document.documentElement.scrollHeight -
               //            (document.documentElement.scrollTop + vheight)
               //         }px`
               //       : '0px',
            }
         }>
         <Container className={classes.inner}>
            <div className={classes.logo}>
               {/* <MantineLogo size={30} /> */}

               <Image alt="" src="/logo/Group_157.png" width={70} height={50} />
               <Text size="xs" color="dimmed" className={classes.description}>
                  Build fully functional accessible web applications faster than
                  ever
               </Text>
            </div>
            <div className={classes.groups}>{groups}</div>
         </Container>
         <Container className={classes.afterFooter}>
            <Text color="dimmed" size="sm">
               © 2022 Three.World. All rights reserved.
            </Text>

            <Group
               spacing={0}
               className={classes.social}
               position="right"
               noWrap>
               <ActionIcon size="lg">
                  <IconBrandTwitter size={18} stroke={1.5} />
               </ActionIcon>
               <ActionIcon size="lg">
                  <IconBrandYoutube size={18} stroke={1.5} />
               </ActionIcon>
               <ActionIcon size="lg">
                  <IconBrandInstagram size={18} stroke={1.5} />
               </ActionIcon>
            </Group>
         </Container>
      </footer>
   )
}
