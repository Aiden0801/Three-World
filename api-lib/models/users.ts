import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   avatar: {
      type: String,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   browsers: [
      {
         id: {
            type: String,
            required: false,
         },
         name: {
            type: String,
            required: false,
         },
      },
   ],
})

module.exports = mongoose.models['user'] || mongoose.model('user', UserSchema)
