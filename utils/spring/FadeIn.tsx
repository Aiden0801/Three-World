import { useEffect, useState } from 'react'

// Libs
import { Waypoint } from 'react-waypoint'
import { useSpring, animated } from 'react-spring'

const FadeIn = ({ children, delayTime = 500, from = 'bottom' }) => {
   const [inView, setInview] = useState(false)

   const transition = useSpring({
      delay: delayTime,
      to: {
         x: !inView && from == 'right' ? 24 : 0,
         y: !inView && from == 'bottom' ? 24 : 0,
         opacity: !inView ? 0 : 1,
      },
   })
   useEffect(() => {
      setInview(true)
   }, [])
   return (
      <Waypoint onEnter={() => setInview(true)}>
         <animated.div style={transition}>{children}</animated.div>
      </Waypoint>
   )
}

export default FadeIn
