require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { globalLogger, otherLogger } = require('./utils/logger.js')

// @Mongoose.
const mongooseUrl = process.env.MONGOOSE_DB_URL
const mongooseOpts = { useNewUrlParser: true }
const mongooseCallback = (err) => {
   console.log(`DB CONNECTION : ${err ? 'FAIL' : 'SUCCESS'}`, err ? err : '')
}
mongoose.connect(mongooseUrl, mongooseOpts, mongooseCallback)

// @Main.
const app = express()
app.use(cors())
app.use(express.json())
app.use([globalLogger, otherLogger])

// @Loader.
require('./routes/index.js')(app)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
   console.log(`server running at port ${PORT}`)
})
