import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')
// ./api/session/getControlSession
// Get Sessions created by me
async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { creator, email, _id } = req.body;
    try {
        let user = await Session.findOne({ _id });
        if (!user) {
            res.status(200).send('No Session');
        }
        else {
            console.log(user.creator)
            if (user.creator !== creator)
                res.status(200).send('Access is denied');
            else {
                var newAllowedUser =
                {
                    email: email,
                }
                Session.findOneAndUpdate(
                    { _id },
                    {
                        $push: {
                            users: newAllowedUser
                        }
                    },
                    function (error, success) {
                        if (error) {
                            res.status(200).send(error);
                        } else {
                            console.log(success);
                        }
                    }
                );
                res.status(200).send('Scuess');

            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;