import type { StreamingApi } from 'hono/utils/stream'

export type CrawleeProps = {
  startUrl: string
  stream: StreamingApi
  selector?: string
  waitFor?: number
  basicAuth?: {
    username: string
    password: string
  }
}
