// eslint-disable-next-line require-await
exports.handler = async function (event) {
  const body = JSON.parse(event.body)

  try {
    return {
      statusCode: 200,
      msg: body,
    }
  } catch (error) {
    return {
      statusCode: 400,
      msg: error,
    }
  }
}
