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
import { fetcher } from '../../../lib/fetcher'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   let { user_id, userdata } = req.body
   // res.status(200).json({ name: req.body, name: req.name });
   const response = await fetcher(`${serverURL}/api/session/allowParticipant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         url: userdata.url,
         email: userdata.email,
      }),
   })
   console.log(req.body, response)
   res.status(200).json({ authorized: true })
}

export default handler
