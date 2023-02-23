import { Image, type ImageProps } from '@mantine/core'

interface BaseProps extends Omit<ImageProps, 'src'> {}

export type VpgLogoProps =
  | Omit<BaseProps, 'width'> & { height: number }
  | Omit<BaseProps, 'height'> & { width: number }

export function VpgLogo(props: VpgLogoProps) {
  return (
    <Image
      alt="VPG Logo"
      src="/logo/vpg-logo-square.png"
      width={'width' in props ? props.width : 'auto'}
      height={'height' in props ? props.height : 'auto'}
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    />
  )
}
