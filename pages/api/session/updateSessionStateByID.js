import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')
// ./api/session/getControlSession
// Get Sessions created by me
async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    const { _id } = req.body;
    await connectMongo();
    try {
        let session = await Session.findOne({ _id });
        if (!session || session.length == 0) {
            res.status(200).send('No Session with ID');
        }
        console.log(session);
        const resp = await axios.get(`https://engine.hyperbeam.com/v0/vm/{${session.session_id}}`, {
            headers: {
                'Authorization': `Bearer ${process.env.HYPERBEAM_KEY}`,
            }
        })
        const termination_data = resp.data["termination_date"];
        console.log(session.isActive, termination_data);
        if (session.isActive == false && termination_data === null) {
            await Session.findOneAndUpdate(
                { session_id: session.session_id },
                {
                    isActive: true,
                    embed_url: resp.data["embed_url"]
                },
                function (error, success) {
                    if (error) {
                        res.status(200).send(error);
                    } else {
                        console.log(success);
                    }
                }
            ).clone();
        }
        else if (session.isActive == true && termination_data !== null) {
            await Session.findOneAndUpdate(
                { session_id: session.session_id },
                {
                    isActive: false,
                    embed_url: "none",
                },
                function (error, success) {
                    if (error) {
                        res.status(200).send(error);
                    } else {
                        console.log(success);
                    }
                }
            ).clone();
        } else;
        res.status(200).send('Sucess');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;