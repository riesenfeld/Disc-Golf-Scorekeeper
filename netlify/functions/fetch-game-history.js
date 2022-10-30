// eslint-disable-next-line require-await
exports.handler = async function () {
  const response = {
    msg: 'This is a message',
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
