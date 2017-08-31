const log = (error, context) => {
  const message = `error ${context}: ${error.message}`;
  console.log(message);
  return new Error(message);
}

const logAndSend = (res, error, context) => {
  res.send(log(error, context));
}

export {
  log,
  logAndSend
}