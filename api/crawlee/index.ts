import {
  PlaywrightCrawler,
  RequestQueue,
  createPlaywrightRouter,
} from 'crawlee'
import { Hono } from 'hono'
import { streamText } from 'hono/streaming'

import { pageInfo } from './pageInfo'
import type { CrawleeProps } from './types'

export const crawlerRun = async (props: CrawleeProps) => {
  const { stream } = props
  const queue = await RequestQueue.open(`${Date.now()}`)
  const router = createPlaywrightRouter()

  const crawler = new PlaywrightCrawler({
    requestHandler: router,
    requestQueue: queue,
    maxRequestRetries: 4,
    maxConcurrency: 4,
    maxRequestsPerCrawl: 5,
    launchContext: {
      useChrome: true,
      launchOptions: {
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
      },
    },
  })

  // データの初期化
  const data = await crawler.getDataset()
  await data.drop()

  // ページ毎の処理を追加
  router.addDefaultHandler(async ({ page, pushData }) => {
    const { title, hasGtm, links } = await pageInfo({ ...props, page })
    await pushData({
      url: page.url(),
      title,
      hasGtm,
    })

    const data = await crawler.getData()
    await stream.write(JSON.stringify(data))

    // リンクをキューに追加
    for (const link of links) {
      if (link.startsWith(props.startUrl)) {
        await queue.addRequest({ url: link })
      }
    }
  })

  await crawler.run([props.startUrl])
  await stream.close()
}

const app = new Hono()
app.get('/', async (c) => {
  return streamText(c, async (stream) => {
    await crawlerRun({
      startUrl: 'https://www.okeihan.net/recommend/hatsumoude/',
      selector: '#react-app',
      stream,
    })
  })
})

export default app
