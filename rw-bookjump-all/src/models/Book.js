import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  authors: {type: String, required: true},
  cover: {type: String, required: true},
  goodreadsId: {type: String},
  requested: {type: Boolean},
  requestedUserId: {type: mongoose.Schema.Types.ObjectId},
  approved: {type: Boolean},
  userId: {type: mongoose.Schema.Types.ObjectId, required: true}
})

export default mongoose.model("Book", schema)
