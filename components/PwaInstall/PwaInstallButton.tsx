import { Button, ButtonProps } from '@mantine/core'
import { usePwaInstall } from '@/hooks/use-pwa-install'

export function PwaInstallButton(props: Omit<ButtonProps, 'onClick'>) {
  const [handlePwaInstall, installed, available] = usePwaInstall()

  if (installed || !available) return null

  return (
    <Button {...props} onClick={handlePwaInstall} />
  )
}
