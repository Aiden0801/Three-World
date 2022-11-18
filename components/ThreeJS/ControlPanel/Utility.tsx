import { Carousel } from '@mantine/carousel'
import { Button, createStyles, Modal, Paper, Text } from '@mantine/core'
import { IconDownload, IconWorldDownload } from '@tabler/icons'
import { useState } from 'react'
import { fetcher } from '../../../lib/fetcher'

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
export default function Utility() {
   const [isScraping, setIsScraping] = useState(false)
   const [data, setData] = useState([])
   const [clicked, setClicked] = useState(false)

   const handleScrapClick = async () => {
      setIsScraping(true)

      const url = 'https://squarepanda.com/'
      const newData = await fetcher(
         'http://localhost:3000/api/scrap/scrapfromURL',
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               url: 'https://squarepanda.com/',
            }),
         }
      )
      setData(newData)
      console.log(newData)
      setIsScraping(false)

      setClicked(!clicked)
      // console.log("newData", data);
   }
   return (
      <>
         <Button
            size="md"
            leftIcon={<IconWorldDownload size={20} />}
            onClick={handleScrapClick}
            loading={isScraping}>
            Scrap
         </Button>

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
      </>
   )
}
