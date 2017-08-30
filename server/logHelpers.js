
const logAndSend = (res, data, message) => {
  console.log(message, data)
  res.send({data, message})
}


export {
  logAndSend
}