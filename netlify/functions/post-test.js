// eslint-disable-next-line require-await
exports.handler = async function (event) {
  const body = JSON.parse(event.body)

  try {
    const response = {
      message: 'Yes, it worked',
      data: body,
    }
    return {
      statusCode: 200,
      msg: JSON.stringify(response),
    }
  } catch (error) {
    return {
      statusCode: 400,
      msg: JSON.stringify(error),
    }
  }
}
