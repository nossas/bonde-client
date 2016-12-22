import superagent from 'superagent'

export const REQUEST_ADD_ACTIVIST_MATCH = 'REQUEST_ADD_ACTIVIST_MATCH'
export const SUCCESS_ADD_ACTIVIST_MATCH = 'SUCCESS_ADD_ACTIVIST_MATCH'
export const FAILURE_ADD_ACTIVIST_MATCH = 'FAILURE_ADD_ACTIVIST_MATCH'

export const addActivistMatch = ({ matchId, activist }) => ({
  types: [REQUEST_ADD_ACTIVIST_MATCH, SUCCESS_ADD_ACTIVIST_MATCH, FAILURE_ADD_ACTIVIST_MATCH],
  promise: () => new Promise((resolve, reject) => {
    superagent
      .post(`${process.env.API_URL}/activist_matches`)
      .send({ activist_match: { match_id: matchId, activist } })
      .end((err, res) => {
        if (err || !res.ok) reject(err || res.body)
        else resolve(res.body)
      })
  })
})
