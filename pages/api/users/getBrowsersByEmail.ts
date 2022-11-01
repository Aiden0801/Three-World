import connectMongo from '../../../api-lib/mongodb';
const User = require('../../../api-lib/models/users');
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { email } = req.body;
    try {
        let user = await User.findOne({ email }).select("browsers");
        if (user) {
            console.log(user);
            res.status(200).json(user)
        }
        else {
            res.status(200).json('No User');
        }
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;