import faunadb from 'faunadb'

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  endpoint: 'https://db.fauna.com/',
})

const q = faunadb.query

exports.handler = async function () {
  try {
    const response = await client.query(
      q.Update(q.Ref(q.Collection('game_state'), '346983465632137812'), {
        data: {
          inProgess: false,
          currentGame: {},
        },
      })
    )
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
