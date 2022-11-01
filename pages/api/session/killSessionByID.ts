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
    let { _id } = req.body;
    try {
        let session = await Session.findOne({

            _id: _id,
        });
        //.select('name session_id isActive');
        if (!session || session.length == 0) {
            res.status(200).send('No Session or Access is denied');
        }
        else {
            const resp = await axios.get(`https://engine.hyperbeam.com/v0/vm/{${session.session_id}}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.HYPERBEAM_KEY}`,
                },
            })
            const termination_data = resp.data["termination_date"];
            console.log(termination_data);
            if (termination_data === null) {
                console.log("Session is active! Deactivating", session.session_id);
                const resp = await axios.delete(`https://engine.hyperbeam.com/v0/vm/{${session.session_id}}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.HYPERBEAM_KEY}`
                    },
                })
                await Session.findOneAndUpdate(
                    { _id: _id },
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
                res.status(200).send('Sucess');
            }
            else {
                console.log("Session is still running");
                res.status(200).send({ session });
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;