import mongoose from 'mongoose'
import { Scene } from '../../components/ThreeJS/Scene'
var Schema = mongoose.Schema
const WebsiteConfig = new mongoose.Schema({
  name: { type: String },
  slug: { type: String },
  global: {
    title: { type: String },
    description: { type: String },
    color: { type: String },
    template: { type: String },
  },
  template: {
    type: Object,
    required: true,
  },
})
module.exports = mongoose.models['websiteconfig'] || mongoose.model('websiteconfig', WebsiteConfig)
