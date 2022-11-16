import { useState } from 'react'

// Libs
import { Waypoint } from 'react-waypoint'
import { useSpring, animated } from 'react-spring'

const FadeIn = ({ children, delayTime = 500 }) => {
   const [inView, setInview] = useState(false)

   const transition = useSpring({
      delay: delayTime,
      to: {
         y: !inView ? 24 : 0,
         opacity: !inView ? 0 : 1,
      },
   })
   return (
      <Waypoint onEnter={() => setInview(true)}>
         <animated.div style={transition}>{children}</animated.div>
      </Waypoint>
   )
}

export default FadeIn
