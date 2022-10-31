import faunadb from 'faunadb'

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  endpoint: 'https://db.fauna.com/',
})
const q = faunadb.query

exports.handler = async function () {
  try {
    const gameHistory = await client.query(
      q.Paginate(q.Documents(q.Collection('dummy_data')))
    )

    const response = {
      msg: gameHistory,
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}
