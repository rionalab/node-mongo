const setResponse = (opts) => {
   const { code, message, extra } = opts
   return { code, message, extra }
}

const something = {
   name: 123,
}

module.exports = {
   setResponse,
   something,
}
