import { Hono } from 'hono'
import { cors } from 'hono/cors'

import posts from './json/posts.json'

// Honoサーバを作成
const hono = new Hono()
hono.use('*', cors())

// APIのエンドポイントを定義
hono.get('/api/hello', (c) => {
  return c.json(posts)
})

export { hono }
