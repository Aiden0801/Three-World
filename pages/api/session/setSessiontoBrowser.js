import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')
// ./api/session/getControlSession
// Get Sessions created by me
async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { _id, email, bIndex } = req.body;
    // bIndex refer to browsers index(0-3)

    console.log("SetSessionToBrowsers", _id);
    try {
        let session = await Session.findOne({
            _id
        });
        let user = await User.findOne({
            email
        });
        console.log(user, session);
        if (!user) {
            res.status(200).send('No User or Access is Denied');
        }
        else if (!session) {
            res.status(200).send('No Session or Access is Denied');
        }
        else {
            console.log(user.browsers[bIndex]);
            user.browsers[bIndex] =
            {
                id: session._id,
                name: session.name,
            }
            await user.save();
            res.status(200).send('Sucess');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;