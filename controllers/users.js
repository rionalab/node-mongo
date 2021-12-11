const { sendResponseError, findRow } = require('./global')
const userModel = require('../models/users')

const index = async (req, res) => {
   try {
      const query = await userModel.find().sort('-createdAt')
      res.send(query)
   } catch (e) {
      sendResponseError(res, e)
   }
}
const create = async (req, res) => {
   try {
      const rowIsDuplicate = await userModel.findOne({
         $or: [{ uname: req.body.uname }, { uemail: req.body.uemail }],
      })

      const bodyIsEmpty = Object.keys(req.body).length < 1

      if (bodyIsEmpty) {
         throw new Error(
            JSON.stringify({
               message: 'Request body is required.',
               code: 400,
            })
         )
      }

      if (rowIsDuplicate) {
         throw new Error(
            JSON.stringify({
               message: `Dupicate entry : ${req.body.uname}.`,
               code: 409,
            })
         )
      }

      const data = new userModel(req.body)

      data.save((err, result) => {
         if (err) {
            throw new Error('something went wrong')
         }

         res.status(201).send(result)
      })
   } catch (e) {
      sendResponseError(res, e)
   }
}
const show = async (req, res) => {
   try {
      const _id = req.params.id
      const rowExist = await findRow(res, _id, userModel)

      rowExist && res.send(rowExist)
   } catch (e) {
      sendResponseError(res, e)
   }
}
const destroy = async (req, res) => {
   try {
      const _id = req.params.id
      const rowExist = await findRow(res, _id, userModel)
      const queryDelete = rowExist && (await userModel.deleteOne({ _id }))

      res.send(queryDelete)
   } catch (e) {
      sendResponseError(res, e)
   }
}
const destroyAll = async (req, res) => {
   try {
      const query = await userModel.deleteMany({})
      res.send(query)
   } catch (e) {
      sendResponseError(res, e)
   }
}
const update = async (req, res) => {
   try {
      const _id = req.params.id
      const rowExist = await findRow(res, _id, userModel)
      rowExist && (await userModel.updateOne({ _id }, { $set: req.body }))
      const updatedRow = await findRow(res, _id, userModel)

      res.send(updatedRow)
   } catch (e) {
      sendResponseError(res, e)
   }
}

module.exports = {
   index,
   create,
   show,
   destroy,
   destroyAll,
   update,
}
