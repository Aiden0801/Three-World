import { ContactForm, VPGContactProps } from '@/components/ContactForm'
import { Card, Container, SimpleGrid, Text, Box } from '@mantine/core'
import { SectionTitle } from './section-title'

export interface ContactFormSectionProps extends VPGContactProps {}

export function VPGContact({ ...props }: ContactFormSectionProps) {
  return (
    <Box component="section" id="contact-form">
      <Container size="lg" my="xl">
        <SimpleGrid
          breakpoints={[
            { maxWidth: 'sm', cols: 1 },
            { minWidth: 'sm', cols: 2 },
          ]}
        >
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              padding: theme.spacing.md,
              [theme.fn.largerThan('sm')]: {
                backgroundColor: theme.colors[theme.primaryColor][8],
                borderRadius: theme.radius.md,
                margin: theme.spacing.xl,
                height: `calc(100% - ${theme.spacing.xl * 3}px)`,
                padding: theme.spacing.xl,
                transform: 'translateX(25%)',
                paddingRight: `${theme.spacing.xl * 1.5}%`,
                marginLeft: `-${theme.spacing.xl}%`,
                ['& > h2, > p']: {
                  color: theme.white,
                },
              },
            })}
          >
            <SectionTitle order={2} align="left">
              Contact us
            </SectionTitle>
            <Text size="lg" align="left" mb="xl" component="p">
              We are always happy to hear from you. Please fill out the form and
              we will get back to you as soon as possible.
            </Text>
          </Box>

          <Card p="xl" radius="md" mb="xl" withBorder={false} shadow="xl">
            <ContactForm {...props} />
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
