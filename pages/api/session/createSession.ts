import connectMongo from '../../../api-lib/mongodb'
import axios from 'axios'
const User = require('../../../api-lib/models/users')
const Session = require('../../../api-lib/models/session')
/***
 * 
 * It's guaranteed that you'll get a new session ID every time you create a new session.
You can think of passing in IDs in save and load as us taking/loading a snapshot of a particular session.
For example, you start a new session with save: true and the session's ID is A.
To load the session, you'd pass in load: "A". A new session will be created with A's data, but this new session ID will be different, say B.
To load the data from session A and overwrite the data when the session is finished, you can do save: "A", load: "A". In practice this is what you'll be doing 99% of the time. 
Also, the keys need to be
{
  profile: {
    save: <uuid>|<boolean>,
    load: <uuid>
  }
}
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverURL } from '../../../config/urlcontrol'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { sessionName, sessionDescription, creator } = req.body
   console.log('createSession', sessionName, sessionDescription)
   try {
      let user = await User.findOne({ email: creator })
      if (!user) {
         res.status(200).json({ email: 'User Not Exist in the DB' })
      } else {
         console.log(process.env.HYPERBEAM_KEY)
         const resp = await axios.post(
            'https://engine.hyperbeam.com/v0/vm',
            {
               profile: {
                  save: true,
               },
               auth: {
                  type: 'webhook',
                  value: {
                     url: 'https://three-world.vercel.app/api/hyperbeam/allow',
                     // url: `${serverURL}/api/hyperbeam/allow`,
                     bearer: process.env.HYPERBEAM_KEY,
                  },
               },
            },
            {
               headers: {
                  Authorization: `Bearer ${process.env.HYPERBEAM_KEY}`,
               },
            }
         )
         console.log(`${serverURL}/api/hyperbeam/allow`)
         let newSession = new Session({
            name: sessionName,
            creator: user.email,
            session_id: resp.data.session_id,
            embed_url: resp.data.embed_url,
            description: sessionDescription,
            isActive: true,
         })
         await newSession.save()
         console.log(resp)
         res.status(200).json({ newSession })
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
