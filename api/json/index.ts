import axios from 'axios'
import { Hono } from 'hono'

import dataJson from './data.json'

const app = new Hono()
app.get('/', (c) => {
  return c.json(dataJson)
})

app.get('/posts', async (c) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return c.json(data)
})

export default app
