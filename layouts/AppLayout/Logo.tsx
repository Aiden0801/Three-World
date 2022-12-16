import { Image, MediaQuery, Text, Title } from "@mantine/core";

export function TextLogo() {
  return (
    <Title order={2}>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Text component="span">HackerHouse</Text>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Text component="span">HH</Text>
      </MediaQuery>

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
