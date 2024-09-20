import { Hono } from 'hono'
import { cors } from 'hono/cors'

import crawlee from './crawlee'
import jsonApi from './json'
import stream from './stream'

const app = new Hono()
app.use('*', cors())

app.get('/api', (c) => {
  return c.json({
    info: 'hono api',
  })
})

app.route('/api/json', jsonApi)
app.route('/api/crawlee', crawlee)
app.route('/api/stream', stream)

export default app
