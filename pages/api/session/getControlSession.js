import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')
import { fetcher } from '../../../lib/fetcher';

// ./api/session/getControlSession
// Get Sessions created by me
async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { creator } = req.body;
    console.log(creator);
    try {
        let user = await Session.find({ creator }).select('name isActive users');
        if (!user || user.length == 0) {
            res.status(200).send('No Session created by this user');
        }
        else {

            for (const session of user) {
                console.log('getControlSession Sessions', session);
                const resp = await fetcher('http://localhost:3000/api/session/updateSessionStateByID', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        _id: session._id,
                    }),
                });
            }
            res.status(200).send({ user });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;