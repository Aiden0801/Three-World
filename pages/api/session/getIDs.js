import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')
// ./api/session/geAvailableSession
async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { email } = req.body;
    console.log(email);
    try {
        let user = await Session.find().select("_id");
        // let user = await Session.find().select("users");

        console.log(user);
        if (!user || user.length == 0) {
            res.status(200).send('No Session Available with this user');
        }
        else {
            res.status(200).send({ user });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;