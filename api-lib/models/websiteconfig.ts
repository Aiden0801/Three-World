import mongoose from 'mongoose'
import { Scene } from '../../components/ThreeJS/Scene'
var Schema = mongoose.Schema
const WebsiteConfig = new mongoose.Schema({
  name: { type: String },
  owner: {
    type: String,
    required: true,
  },
  createdAt: { type: Date },
  slug: { type: String },
  global: {
    title: { type: String },
    description: { type: String },
    template: { type: String },
  },
  template: {
    type: Object,
    required: true,
  },
})
module.exports = mongoose.models['websiteconfig'] || mongoose.model('websiteconfig', WebsiteConfig)
