
import axios from 'axios'

export const recordScore = (payload) => {
  axios
    .get('/api/score_board/record', {
      params: payload
    })
    .then(() => console.log('success'))
    .catch((error) => console.log(error))
}
