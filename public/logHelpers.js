const log = (error, context) => {
  let status, statusText;
  if(error.message) {
    status = error.code;
    statusText = error.message;
  } else {
    status = error.response.status;
    statusText = error.response.statusText;
  }

  const message = `error with ${context}: ${status}, ${statusText}`;
  console.log(message);
  return { error: true, message };
}

export {
  log
}