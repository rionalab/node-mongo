const mongoose = require('mongoose')

const defaultResponse = {
   serverError: 'Something went wrong, please try again later.',
}

const sendResponseError = (res, err, options = {}) => {
   let opts = options

   try {
      const parsed = JSON.parse(err.message)
      if (typeof parsed === 'object') {
         opts = parsed
      }
   } catch (e) {}

   res.status(opts?.code ?? 500).send({
      message: opts?.message || err?.message || defaultResponse.serverError,
   })
}
const findRow = async (res, _id, model) => {
   try {
      const idIsInvalid = !mongoose.isValidObjectId(_id)
      const query = idIsInvalid ? null : await model.findById(_id)

      if (idIsInvalid || !query) {
         throw new Error(
            JSON.stringify({
               message: idIsInvalid ? 'ID is not valid.' : 'Row not found',
               code: 404,
            })
         )
      }

      return query
   } catch (e) {
      sendResponseError(res, e)
   }
}

module.exports = {
   sendResponseError,
   findRow,
}
