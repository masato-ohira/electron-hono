import { Hono } from 'hono'
import { cors } from 'hono/cors'

import jsonApi from './json'

// Honoサーバを作成
const app = new Hono()
app.use('*', cors())

app.get('/api', (c) => {
  return c.json({
    ok: true,
  })
})

// APIのエンドポイントを定義
app.route('/api/json', jsonApi)
export default app
