import { createStyles, Title } from "@mantine/core"
import React, { ComponentProps } from "react"

export const useStyles = createStyles((theme) => {
  const dark = theme.colorScheme === 'dark'
  return {
    sectionTitle: {
      fontSize: 52,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      marginBottom: theme.spacing.xl * 1.5,
      color: theme.colors[theme.primaryColor][dark ? 0 : 9],
    },
  }
})

export function SectionTitle(props: ComponentProps<typeof Title>) {
  const { classes, cx } = useStyles()
  return React.createElement(Title, {
    align: 'center',
    className: cx(classes.sectionTitle, props.className),
    ...props
  })
}
