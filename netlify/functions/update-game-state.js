// eslint-disable-next-line require-await
exports.handler = async function (event) {
  const eventBody = JSON.parse(event.body)

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: eventBody }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}
