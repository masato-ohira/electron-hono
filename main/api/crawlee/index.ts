// For more information, see https://crawlee.dev/
import { PlaywrightCrawler } from 'crawlee'
import { devices } from 'playwright'
import { createRouter } from './routes'
import type { CrawleeProps } from './types'

const { router, queue } = await createRouter({
  startUrl: 'https://www.okeihan.net/recommend/hatsumoude/',
  selector: '#react-app',
})

export const crawlerRun = async (e, props: CrawleeProps) => {
  const crawler = new PlaywrightCrawler({
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    requestHandler: router,
    requestQueue: queue,
    // Comment this option to scrape the full website.
    maxRequestRetries: 4,
    // maxConcurrency: 4,
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

  crawler.run([props.startUrl])
}
