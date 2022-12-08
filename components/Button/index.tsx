import { createStyles } from '@mantine/core'
import { Button, ButtonProps, Tooltip } from '@mantine/core'
import { TablerIconProps } from '@tabler/icons'
import { GithubIcon, DiscordIcon } from '@mantine/ds'
import Image from 'next/image'
import { forwardRef } from 'react'
interface IButtonProps extends ButtonProps {
   onClick?: () => void
}

const useStyles = createStyles((theme) => ({
   button: {
      width: '350px',
      height: '50px',

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
         maxWidth: '80%',
         maxHeight: '60%',
         fontSize: '15px',
         size: 'md',
      },
   },
}))
export function GoogleButton(props: IButtonProps) {
   const { classes } = useStyles()
   return (
      <Button
         className={classes.button}
         compact
         size="xl"
         radius="xl"
         leftIcon={
            <Image src="/GoogleIcon.svg" alt="" width={50} height={50} />
         }
         color="red"
         sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
         })}
         variant="outline"
         {...props}
      />
   )
}
export function DiscordButton(props: IButtonProps) {
   const { classes } = useStyles()
   return (
      <Button
         className={classes.button}
         radius="xl"
         size="xl"
         leftIcon={<DiscordIcon size={50} />}
         sx={(theme) => ({
            backgroundColor:
               theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
            '&:hover': {
               backgroundColor:
                  theme.colorScheme === 'dark'
                     ? theme.fn.lighten('#5865F2', 0.05)
                     : theme.fn.darken('#5865F2', 0.05),
            },
         })}
         {...props}
      />
   )
}

export function GithubButton(props: IButtonProps) {
   const { classes } = useStyles()
   return (
      <Button
         className={classes.button}
         radius="xl"
         size="xl"
         {...props}
         leftIcon={<GithubIcon size={50} />}
         sx={(theme) => ({
            backgroundColor:
               theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            color: '#fff',
            '&:hover': {
               backgroundColor:
                  theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            },
         })}
      />
   )
}
export type IPropsToolTipButton = ButtonProps & {
   description?: string
   onClick?: () => void
}
export const ToolTipButton = forwardRef<HTMLButtonElement, IPropsToolTipButton>(
   ({ description, ...props }, _ref) => {
      return (
         <Tooltip label={description}>
            <Button {...props} />
         </Tooltip>
      )
   }
)
ToolTipButton.displayName = 'ToolTipButton'
