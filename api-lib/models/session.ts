import mongoose from 'mongoose'

const SessionSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   session_id: {
      type: String,
      required: true,
   },
   embed_url: {
      type: String,
   },
   creator: {
      type: String,
      required: true,
   },
   users: [
      {
         email: {
            type: String,
         },
      },
   ],

   description: {
      type: String,
   },
   isActive: {
      type: Boolean,
      required: true,
   },

   //   password: {
   //     type: String,
   //     required: true
   //   },
   //   avatar: {
   //     type: String
   //   },
   //   date: {
   //     type: Date,
   //     default: Date.now
   //   }
})

module.exports =
   mongoose.models['session'] || mongoose.model('session', SessionSchema)
