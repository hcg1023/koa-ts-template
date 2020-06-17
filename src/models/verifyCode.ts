import mongoose from './mongoose'
const Schema = mongoose.Schema
const VerifyCodeSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
  },
})

export default mongoose.model('verifyCode', VerifyCodeSchema)
