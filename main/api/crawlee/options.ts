import type { PlaywrightCrawlerOptions } from 'crawlee'

export const options: PlaywrightCrawlerOptions = {
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
}
