import mongoose from 'mongoose'
const TwoConfig = new mongoose.Schema({
   name: { type: String },
   global: {
      title: { type: String },
      description: { type: String },
      color: { type: String },
   },
   sections: {
      hero: {
         title: { type: String },
         description: { type: String },
         image: { type: String },
         buttons: {
            primary: {
               text: { type: String },
               action: { type: String },
               link: { type: String },
            },
            secondary: {
               text: { type: String },
               action: { type: String },
               link: { type: String },
            },
         },
      },
      services: [
         {
            name: { type: String },
            description: { type: String },
            filler: {
               type: { type: String },
               url: { type: String },
            },
         },
      ],
      team: [
         {
            name: { type: String },
            picture: { type: String },
            linkedin: { type: String },
            twitter: { type: String },
            website: { type: String },
         },
      ],
      clients: [
         {
            name: { type: String },
            description: { type: String },
            url: { type: String },
            logo: { type: String },
         },
      ],
      footer: {
         copyright: {
            year: { type: Number },
            company: { type: String },
         },
         menu: [
            {
               title: { type: String },
               items: [
                  {
                     title: { type: String },
                     href: { type: String },
                  },
               ],
            },
         ],
      },
   },
})

module.exports =
   mongoose.models['twoconfig'] || mongoose.model('twoconfig', TwoConfig)
