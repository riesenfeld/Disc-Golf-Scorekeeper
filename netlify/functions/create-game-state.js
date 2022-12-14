import faunadb from 'faunadb'

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  endpoint: 'https://db.fauna.com/',
})

const q = faunadb.query

exports.handler = async function (event) {
  const body = JSON.parse(event.body)

  try {
    const response = await client.query(
      q.Update(q.Ref(q.Collection('game_state'), '346983465632137812'), {
        data: {
          inProgess: true,
          currentGame: {
            course: body.course,
            date: body.date,
            players: body.players,
            baskets: [],
          },
        },
      })
    )
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
