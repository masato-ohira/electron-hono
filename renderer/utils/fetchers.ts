import axios from 'axios'

// export const honoClient = axios.create({
//   baseURL: 'http://localhost:8787',
// })

const baseURL = 'http://localhost:8787'

export const honoApi = (path: string) => {
  return `http://localhost:8787${path}`
}
