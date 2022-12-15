import { Image, Text, Title } from "@mantine/core";

export function TextLogo() {
  return (
    <Title order={2}>
      HackerHouse
      <Text span size="xl" color="green" inherit>
        HQ
      </Text>
    </Title>
  )
}


export function ImageLogo() {
  return (
    <Image alt="" src="/logo/Group_157.png" width="auto" height={72} />

  )
}
