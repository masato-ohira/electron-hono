import {
  PlaywrightCrawler,
  type PlaywrightLaunchContext,
  RequestQueue,
  createPlaywrightRouter,
} from 'crawlee'
import { Hono } from 'hono'
import { streamText } from 'hono/streaming'

import type { CrawleeProps } from '@ts/crawlee'
import { pageInfo } from './pageInfo'

let cancelCrawl = false

const crawlerRun = async (props: CrawleeProps) => {
  const { stream } = props
  const queue = await RequestQueue.open(`${Date.now()}`)
  const router = createPlaywrightRouter()
  cancelCrawl = false

  const launchOptions: PlaywrightLaunchContext['launchOptions'] = {
    channel: 'chrome',
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
  }

  const crawler = new PlaywrightCrawler({
    requestHandler: router,
    requestQueue: queue,
    maxRequestRetries: 4,
    maxConcurrency: 4,
    maxRequestsPerCrawl: 100,
    launchContext: {
      useChrome: true,
      launchOptions,
    },
  })

  // データの初期化
  const data = await crawler.getDataset()
  await data.drop()

  // ページ毎の処理を追加
  router.addDefaultHandler(async ({ page, pushData }) => {
    if (cancelCrawl) {
      await crawler.teardown()
      return
    }
    const { links, ...results } = await pageInfo({ ...props, page })
    await pushData({
      url: page.url(),
      ...results,
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
  const query = c.req.query()
  return streamText(c, async (stream) => {
    await crawlerRun({
      startUrl: query?.url,
      selector: 'body',
      stream,
    })
  })
})

app.post('/cancel', (c) => {
  cancelCrawl = true // キャンセルフラグを立てる
  return c.json({
    info: 'Crawl canceled.',
  })
})

export default app
