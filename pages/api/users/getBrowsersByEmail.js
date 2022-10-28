import connectMongo from '../../../api-lib/mongodb';
const User = require('../../../api-lib/models/users');
async function handler(req, res) {

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
    // const user = await findUserByEmail(db, email);
    // console.log(user);
    // if (user) {
    //     res.status(200).json({ name: 'Account Exists' })
    // }
    // else {
    //     insertUser(db, {
    //         email: Math.random().toString(36).slice(2) + email,
    //         bio: '',
    //         name: Math.random().toString(36).slice(2) + email,
    //         profilePicture: '',
    //         username: Math.random().toString(36).slice(2) + email,
    //     })
    //     console.log('insert user called');
    //     res.status(200).json({ name: 'Register Account' })
    // }
}

export default handler;