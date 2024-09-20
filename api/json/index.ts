import path from 'node:path'
import axios from 'axios'
import fs from 'fs-extra'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => {
  const fullPath = path.join(__dirname, '..', 'main/api/json/data.json')
  // console.log({ dir })
  const json = fs.readJSONSync(fullPath)
  return c.json(json)
})

app.get('/posts', async (c) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return c.json(data)
})

export default app
