import { useState } from 'react'
import { z } from 'zod'

import { showNotification } from '@mantine/notifications'
import { useForm, zodResolver } from '@mantine/form'
import { Button, Flex, Input } from '@mantine/core'
import { useUserData } from '@/contexts/User'
import logger from '@/utils/logger'

export const schema = z.object({
  name: z.string(),
  email: z.string().email('Email must be a valid email address'),
  businessName: z.string(),
})

export type DemoFormValues = z.output<typeof schema>

export interface EarlyAccessFormProps {
  onSubmit: (values: DemoFormValues) => Promise<boolean>
}

export function EarlyAccessForm({ onSubmit }: EarlyAccessFormProps) {
  const [sending, setSending] = useState(false)
  const user = useUserData()
  const form = useForm<DemoFormValues>({
    validateInputOnBlur: true,
    validate: zodResolver(schema),
    initialValues: {
      name: user.name,
      email: user.email,
      businessName: '',
    },
  })

  const handleSubmit = async (values: DemoFormValues) => {
    if (!onSubmit) {
      logger.warn('no submit function was passed to the contact form')
      throw new Error('Form submission not implemented')
    }
    setSending(true)

    logger.info(values)
    try {
    const success = await onSubmit(values)
      if (success) {
        showNotification({
          title: 'Thank you!',
          message: 'We will get back to you shortly.',
          color: 'teal',
        })
        form.reset()
      }
    } catch (error) {
      showNotification({
        title: 'Oops!',
        message: 'Something went wrong. Please try again later.',
        color: 'red',
      })
    }
    finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" align="center" gap="sm" w="100%">
        <Input
          label="Business name"
          placeholder="What's your business name"
          required
          w="100%"
          {...form.getInputProps('businessName')}
          autoFocus
        />
        {/* <Input
          label="Name"
          placeholder="Your name"
          required
          w="100%"
          {...form.getInputProps('name')}
          autoFocus
        />
        <Input
          label="Email"
          placeholder="Your email"
          required
          w="100%"
          {...form.getInputProps('email')}
        /> */}
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="filled"
          loading={sending}
          loaderPosition="center"
          disabled={sending || !form.isValid()}
        >
          Request
        </Button>
      </Flex>
    </form>
  )
}
