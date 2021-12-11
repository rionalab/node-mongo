const globalLogger = (req, res, next) => {
   console.log('Logger from GlobalLogger')
   /* console.log(req?.body ?? 'NO BODY')
   if (!Object.keys(req?.body ?? {}).length) {
      return res.status(401).send({
         msg: 'missing body',
      })
   } */

   next()
}

const otherLogger = (req, res, next) => {
   console.log('Logger from otherLogger')

   next()
}

module.exports = {
   globalLogger,
   otherLogger,
}
