const mongoose = require('mongoose')
const userModel = require('../models/users')

const getRowById = async (id) => {
   const idIsValid = mongoose.isValidObjectId(id)
   return !idIsValid ? null : await userModel.findById(id)
}

module.exports = {
   getRowById,
}
