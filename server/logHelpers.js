
const logAndSend = (res, data, message) => {
  console.log(message)
  res.send(data)
}


export {
  logAndSend
}