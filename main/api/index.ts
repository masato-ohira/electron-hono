import { Hono } from 'hono'
import { cors } from 'hono/cors'

// import playwright from './playwright'
import crawlee from './crawlee'
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
// app.route('/api/playwright', playwright)
app.route('/api/crawlee', crawlee)
export default app
