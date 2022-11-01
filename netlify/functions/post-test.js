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
      body: JSON.stringify({ msg: response }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}
