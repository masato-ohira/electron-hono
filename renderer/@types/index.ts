export type PageData = {
  url: string
  hasGtm: boolean
  // no404: boolean
  // noError: boolean
  title: string
  description: string
  keywords: string
  ogUrl: string
  ogImage: string
}

export type CrawleeResponse = {
  count: number
  desc: boolean
  items: PageData[]
  limit: number
  offset: number
  total: number
}
