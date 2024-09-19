import fs from 'fs-extra'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => {
  const json = fs.readJSONSync('./data.json')
  return c.json(json)
})

export default app
