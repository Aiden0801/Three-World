import { Container, Text, Title, Image, Stack, Flex } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { SectionTitle } from './section-title'

export function Features() {
  return (
    <Container size="lg" mb="xl">
      <SectionTitle>Use Cases</SectionTitle>
      <Carousel loop withIndicators slideSize="100%" slideGap="md">
        {features_data.map((feature, i) => (
          <Carousel.Slide key={i} mb="xl" px="xl">
            <Flex direction="column" gap="xl">
              <Stack sx={{ height: '100%', placeItems: 'center' }}>
                <Title order={3} mb="md" align="center">
                  {feature.title}
                </Title>
                <Text align="center">{feature.description}</Text>
              </Stack>
              <Image
                src={`/imgs/features/${feature.image}`}
                // sx={{ maxWidth: '90%' }}
                width="auto"
                mx="auto"
                height="400px"
              />
            </Flex>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  )
}

const features_data = [
  {
    title: 'Collaborate with other Users',
    description: 'Collaborate with team members in Virtual Co-Op Spaces',
    image: 'unreal-hhhq-station.gif',
  },
  {
    title: 'Explore the Virtual Pro Galaxy™',
    description: 'Explore our Metaverse!',
    image: 'unreal-hhhq-station-full.gif',
  },
  {
    title: 'Create Websites with No Code',
    description: 'Utilize forms and/or AI to build websites',
    image: 'hhhq-cockpit-webpage-builder.gif',
  },
  {
    title: 'Build and Manage Communities',
    description:
      'Build and manage Communities from scratch with your Virtual Pro Bot',
    image: 'hhhq-discord-bot.gif',
  },
  {
    title: 'Travel to different Worlds',
    description: 'Explore User-generated worlds in the Virtual Pro Galaxy',
    image: 'js-spaceship-galaxy.gif',
  },
  {
    title: 'Join other Pros in the Metaverse',
    description: 'Party with your friends in the Metaverse!',
    image: 'hbcu-made-demo.gif',
  },
  {
    title: 'Utilize Artificial Intelligence',
    description: 'Utilize the latest AI technology',
    image: 'hhhq-chat-bot.gif',
  },
  {
    title: 'Share Virtual Cockpit Sessions',
    description:
      'Share browser sessions with team members as you incubate your business from the Virtual Cockpit',
    image: 'hhhq-cockpit-session-sharing.gif',
  },
  {
    title: 'Explore the Moon Station',
    description:
      'Explore the moon station, Hacker House HQ, the first world in the Virtual Pro Galaxy',
    image: 'hhhq-metaverses-demo-original.gif',
  },
  {
    title: 'Design your own Worlds',
    description: 'Design your Worlds with help from our platform Specialists',
    image: 'js-spaceship-old.gif',
  },
  {
    title: 'Create Virtual Pitch Decks',
    description:
      'Create Virtual Pitch Decks to secure funding for your business',
    image: 'virtual-pitch-deck.gif',
  },
  {
    title: 'And much more!',
    description:
      'Subscribe to our newsletter below to stay up to date with our Roadmap',
    image: 'astronaut-in-space.gif',
  },
] as const
