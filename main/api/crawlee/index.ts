import { PlaywrightCrawler } from 'crawlee'
import { Hono } from 'hono'
import { createRouter } from './routes'
import type { CrawleeProps } from './types'

export const crawlerRun = async (props: CrawleeProps) => {
  const { router, queue } = await createRouter({
    startUrl: props.startUrl,
    selector: props.selector,
  })
  const crawler = new PlaywrightCrawler({
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    requestHandler: router,
    requestQueue: queue,
    // Comment this option to scrape the full website.
    maxRequestRetries: 4,
    maxConcurrency: 4,
    maxRequestsPerCrawl: 200,
    launchContext: {
      useChrome: true,
      launchOptions: {
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },

        ignoreHTTPSErrors: true,
      },
    },
  })
  await crawler.run([props.startUrl])
  const res = await crawler.getData()
  return res
}

const app = new Hono()
app.get('/', async (c) => {
  const data = await crawlerRun({
    startUrl: 'https://www.okeihan.net/recommend/hatsumoude/',
    selector: '#react-app',
  })

  return c.json({
    data,
    done: true,
  })
})

export default app
