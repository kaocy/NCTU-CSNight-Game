
import axios from 'axios'

export const recordScore = (payload) => {
  let data = new FormData()
  data.append('pid',payload.pid)
  data.append('score', payload.score)
  axios
    .post(`${SERVER_URL}/api/score_board/record`, data)
    .then(() => console.log('success'))
    .catch((error) => console.log(error))
}
