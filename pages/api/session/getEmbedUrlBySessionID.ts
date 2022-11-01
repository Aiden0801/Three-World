import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')
// ./api/session/getControlSession
// Get Sessions created by me
import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { session_id, email } = req.body;
    console.log(session_id, email);
    try {
        let user = await Session.findOne({
            session_id: session_id,
            "users.email": `${email}`,
        }).select("embed_url");
        console.log(user);
        if (!user || user.length == 0) {
            res.status(200).send('No Session or Access is Denied');
        }
        else {
            res.status(200).send(user.embed_url);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;