export type CrawleeProps = {
  startUrl: string
  selector?: string
  waitFor?: number
  basicAuth?: {
    username: string
    password: string
  }
}
