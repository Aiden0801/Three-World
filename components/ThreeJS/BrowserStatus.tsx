import React from 'react'
import { createStyles, Text } from '@mantine/core'
import {
   getCurrentBrowser,
   getCurrentBrowserData,
   getCurrentURL,
   setCommand,
   getCommand,
} from '../../store/browserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { IconActivity } from '@tabler/icons'
const useStyles = createStyles((theme, _params, getRef) => {
   return {
      container: {
         position: 'absolute',
         bottom: 30,
         right: 100,
      },
      text: {
         fontFamily: 'Greycliff CF, sans-serif',
         fontSize: 30,
      },
   }
})

export default function BrowserStatus() {
   const { classes, cx } = useStyles()
   const curBrowser = useSelector(getCurrentBrowserData)
   const curURL = useSelector(getCurrentURL)

   return (
      <Text className={classes.container}>
         Hello
         {/* <Text weight={700} color='white'
                className={classes.text}
            >Screen {curBrowser.index + 1}
                {curBrowser && curBrowser.data.url == 'none' && <IconActivity color='red' size={30} />}
                {curBrowser && curBrowser.data.url != 'none' && <IconActivity color='green' size={30} />}
            </Text>
            <Text weight={700} color='white'
                className={classes.text}

            >
                {curBrowser.data.name}</Text> */}
      </Text>
   )
}
