import React, { useEffect, useState } from 'react'
import {
   createStyles,
   Stack,
   Burger,
   Button,
   Container,
   ActionIcon,
   Modal,
   Paper,
   Text,
   Title,
   LoadingOverlay,
   Drawer,
   Box,
   Grid,
   Dialog,
} from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import {
   IconDownload,
   IconWorldDownload,
   IconArrowBigLeft,
   IconArrowBigRight,
   IconActivity,
} from '@tabler/icons'
import {
   getCurrentBrowser,
   getCurrentBrowserData,
   getCurrentURL,
   setCommand,
   getCommand,
} from '../../store/browserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetcher } from '../../lib/fetcher'
import { Box2 } from 'three'
const useStyles = createStyles((theme) => ({
   card: {
      height: 440,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
   },
   stack: {},

   title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 900,
      color: theme.white,
      lineHeight: 1.2,
      fontSize: 32,
      marginTop: theme.spacing.xs,
   },

   category: {
      color: theme.white,
      opacity: 0.7,
      fontWeight: 700,
      textTransform: 'uppercase',
   },
   drawer: {
      backgroundColor: 'grey',
   },
}))
async function download(url) {
   const a = document.createElement('a')
   a.href = await toDataURL(url)
   a.download = 'myImage.png'
   document.body.appendChild(a)
   a.click()
   document.body.removeChild(a)
}

function toDataURL(url) {
   return fetch(url)
      .then((response) => {
         return response.blob()
      })
      .then((blob) => {
         return URL.createObjectURL(blob)
      })
}
function Card({ image, title, category }) {
   const { classes } = useStyles()

   return (
      <Paper
         shadow="md"
         p="xl"
         radius="md"
         sx={{ backgroundImage: `url(${image})` }}
         className={classes.card}>
         <div>
            <Text className={classes.category} size="xs">
               {/* {image} */}
               Image
            </Text>
         </div>
         <Button
            variant="white"
            color="dark"
            leftIcon={<IconDownload />}
            onClick={() => {
               download(image)
            }}>
            Download
         </Button>
      </Paper>
   )
}
const ControlPanel = () => {
   const dispatch = useDispatch()
   const curBrowser = useSelector(getCurrentBrowserData)
   const curURL = useSelector(getCurrentURL)
   const curCommand = useSelector(getCommand)
   const [opened, setOpened] = useState(false)
   const [isScraping, setIsScraping] = useState(false)
   const title = opened ? 'Close navigation' : 'Open navigation'
   const [clicked, setClicked] = useState(false)
   const [data, setData] = useState([])
   const [isHandling, setIsHandling] = useState(false)
   const { classes, cx } = useStyles()

   const handleScrapClick = async () => {
      setIsScraping(true)

      console.log(curURL)
      //const url = "https://squarepanda.com/";
      const newData = await fetcher(
         'http://localhost:3000/api/scrap/scrapfromURL',
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               url: curURL,
            }),
         }
      )
      setData(newData)
      console.log(newData)
      setIsScraping(false)

      setClicked(!clicked)
      // console.log("newData", data);
   }
   const handleCommand = async (type) => {
      if (curCommand.handle == 1) return
      dispatch(
         setCommand({
            type: type,
            handling: 1,
         })
      )
   }
   return (
      <>
         <LoadingOverlay visible={isHandling} overlayBlur={2} />
         <Burger
            color="white"
            style={{ position: 'absolute', top: 50, right: 50 }}
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={title}
         />

         <Modal size="700px" opened={clicked} onClose={() => setClicked(false)}>
            <Text color="teal" size="xl">
               Teal text
            </Text>
            <Carousel
               slideSize="30%"
               breakpoints={[
                  { maxWidth: 'sm', slideSize: '100%', slideGap: 2 },
               ]}
               slideGap="xl"
               align="start"
               slidesToScroll={3}>
               {data.length >= 1 &&
                  data.map((item, index) => (
                     <Carousel.Slide key={index}>
                        <Card {...item} />
                     </Carousel.Slide>
                  ))}
            </Carousel>
         </Modal>
         {/* <Drawer
            opened={opened}
            // style={{ width: 150, height: 70, position: 'absolute', top: 45, right: 25, backgroundColor: 'whilte', }}
            position="right"
            onClose={() => setOpened(false)}
            closeOnClickOutside={false}
            closeOnEscape={false}
            overlayBlur={0}
            withOverlay={false}
            overlayOpacity={0}
            size={250}> */}
         {/*  */}
         <Dialog opened={opened}>
            <Stack align="center" className={classes.stack}>
               <Text
                  align="center"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  size="xl"
                  weight={700}
                  style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                  Control Panel
               </Text>
               <Text
                  align="center"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  size="md"
                  weight={700}
                  style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                  Screen {curBrowser.index}
                  {curBrowser && curBrowser.data.url == 'none' && (
                     <IconActivity color="red" size={15} />
                  )}
                  {curBrowser && curBrowser.data.url != 'none' && (
                     <IconActivity color="green" size={15} />
                  )}
               </Text>
               <Text
                  align="center"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  size="md"
                  weight={700}
                  style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                  {curBrowser.data.name}
               </Text>
               <Grid justify="space-around">
                  <Grid.Col span={3} style={{ minWidth: 60 }}>
                     <ActionIcon
                        size="xl"
                        variant="filled"
                        color="green"
                        onClick={() => handleCommand(1)}>
                        <IconArrowBigLeft size={60} />
                     </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span={3} style={{ minWidth: 60 }}>
                     <ActionIcon
                        size="xl"
                        variant="filled"
                        color="green"
                        onClick={() => handleCommand(2)}>
                        <IconArrowBigRight size={60} />
                     </ActionIcon>
                  </Grid.Col>
               </Grid>
               <Button
                  size="md"
                  leftIcon={<IconWorldDownload size={20} />}
                  onClick={handleScrapClick}
                  loading={isScraping}>
                  Scrap
               </Button>
            </Stack>
         </Dialog>
         {/* </Drawer> */}
      </>
   )
}
export default ControlPanel
