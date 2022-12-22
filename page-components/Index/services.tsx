import {
  createStyles,
  Title,
  Container,
  Accordion,
  MantineProvider,
  Text,
  Box,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { Dots } from './dots'
import { SectionTitle } from './section-title';

type FAQ = { title: string; text: string }
const FAQ: FAQ[] = [
  {
    title: 'App and Game Development',
    text: 'We develop next-gen games and applications, including 3D, VR, AR, and Metaverse apps.',
  },
  {
    title: 'Web3 Consultation',
    text: 'We provide consultation on Web3 technologies, including Metaverses, NFTs, DeFi, and DAOs.',
    // text: 'We consult on everything Web3, including NFTs, Metaverses, Blockchain implementation, Web2 Migration, etc.',
  },
  {
    title: 'Global Advisory',
    text: 'We provide advisory services to businesses and organizations, including startups, governments, and NGOs.',
    // text: 'We provide advice and beneficial contacts to assist in global outreach and expansion'
  },
  {
    title: 'Networking',
    text: 'We provide networking opportunities for businesses, organizations, and individuals.',
    // text: 'We provide contacts to expand your network in desired areas',
  },
]

const useStyles = createStyles((theme, _params, getRef) => {
  const dark = theme.colorScheme === 'dark'
  const bgColor = dark ? theme.colors.dark : theme.colors.gray
  const radial = {
    from: bgColor[dark ? 5 : 3],
    // to: dark ? bgColor[9] : theme.white,
    to: bgColor[dark ? 7 : 2],
  }
  const gradient = `radial-gradient(${radial.from} 0%, ${radial.to} 60%)`

  const cardBg = {
    closed: dark ? 7 : 5,
    open: dark ? 8 : 4,
  }

  return {
    // NATIVE ACCORDION ITEMS
    item: {
      backgroundColor: theme.colors[theme.primaryColor][cardBg.closed],
      // borderBottom: 0,
      borderRadius: theme.radius.md,
      border: 0,
      boxShadow: theme.shadows.md,
      overflow: 'hidden',
      transition: 'all 200ms ease',
      width: '100%',
      marginLeft: 0,
      '&[data-active]': {
        backgroundColor: theme.colors[theme.primaryColor][cardBg.open],
        width: '105%',
        marginLeft: '-2.5%',
        boxShadow: theme.shadows.xl,
      },
    },

    control: {
      fontSize: theme.fontSizes.lg,
      padding: `${theme.spacing.md}px ${theme.spacing.md}px`,
      // boxShadow: `0 2px 0 0 ${theme.colors[theme.primaryColor][cardBg.closed]}`,
    },

    panel: {
      lineHeight: 1.6,
    },
    chevron: {
      '&[data-rotate]': {
        transform: 'rotate(45deg)',
      },
    },

    // EXTRA CLASSES
    content: {
      color: theme.colors.gray[dark ? 2 : 9],
    },
    wrapper: {
      // background: 'red',
      background: bgColor[radial.from],
      position: 'relative',
    },
    container: {
      // backgroundImage: gradient,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top left',
    },
    itemTitle: {
      color: dark ? theme.white : theme.black,
    },
  }
})

export function Services() {
  const { classes, cx } = useStyles()
  return (
    <Box my="xl" className={classes.wrapper} data-role="derp">
      <Container py="xl" size="sm" className={classes.container}>
        <SectionTitle>
          Services
        </SectionTitle>

        <MantineProvider inherit theme={{ colorScheme: 'dark' }}>
          <Accordion
            variant="separated"
            chevronPosition="right"
            classNames={{
              control: classes.control,
              chevron: classes.chevron,
              item: classes.item,
              panel: classes.panel,
            }}
            chevron={<IconPlus size={32} stroke={1.5} color="white" />}
          >
            {FAQ.map((faq, index) => (
              <Accordion.Item value={faq.title} key={index}>
                <Accordion.Control>
                  <Text
                    weight={600}
                    transform="uppercase"
                    className={classes.itemTitle}
                  >
                    {faq.title}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box className={classes.content}>
                    <Text>{faq.text}</Text>
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </MantineProvider>
      </Container>
    </Box>
  )
}
