import type { StreamingApi } from 'hono/utils/stream'

export type CrawleeProps = {
  startUrl: string
  stream: StreamingApi
  selector?: string
  waitFor?: number
  basicUser?: string
  basicPass?: string
}

export type CrawleeForm = Omit<CrawleeProps, 'stream'>

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
