import { z } from 'zod'

import { showNotification } from '@mantine/notifications'
import { useForm, zodResolver } from '@mantine/form'
import { Button, Flex, Input } from '@mantine/core'
import logger from '@/utils/logger'
import { useState } from 'react'

export const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Email must be a valid email address'),
})

export type DemoFormValues = z.output<typeof schema>

export interface RequestDemoFormProps {
  onSubmit: (values: DemoFormValues) => Promise<boolean>
}

export function RequestDemoForm({ onSubmit }: RequestDemoFormProps) {
  const [sending, setSending] = useState(false)
  const form = useForm<DemoFormValues>({
    validateInputOnBlur: true,
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
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
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="filled"
          loading={sending}
          loaderPosition="center"
          disabled={sending || !form.isValid()}
        >
          Request demo
        </Button>
      </Flex>
    </form>
  )
}
