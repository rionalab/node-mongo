const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   {
      // _id: mongoose.Schema.Types.ObjectId,
      uname: {
         // type: Boolean,
         // default: false,
         type: String,
         required: true,
      },
      uemail: {
         type: String,
         unique: true,
         required: true,
      },
      umobile: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = mongoose.model('users', userSchema)
