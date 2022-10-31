import faunadb from 'faunadb'

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  endpoint: 'https://db.fauna.com/',
})
const q = faunadb.query

exports.handler = async function () {
  try {
    const gameHistory = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('game_history'))),
        q.Lambda('documentRef', q.Get(q.Var('documentRef')))
      )
    )

    const response = gameHistory.data.map((document) => document.data)

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
