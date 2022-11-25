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
   createdAt: {
      type: Date,
   },
   users: [
      {
         email: {
            type: String,
         },
      },
   ],
   participants: [
      {
         _id: false,
         email: {
            type: String,
            unique: true,
         },
      },
   ],
   description: {
      type: String,
      required: true,
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
