
import axios from 'axios'

export const recordScore = (payload) => {
  console.log(payload)
  axios
    .get(`${SERVER_URL}/api/score_board/record`, {
      params: payload
    })
    .then(() => console.log('success'))
    .catch((error) => console.log(error))
}
