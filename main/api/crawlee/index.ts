import {
  Dataset,
  PlaywrightCrawler,
  RequestQueue,
  createPlaywrightRouter,
} from 'crawlee'
import { Hono } from 'hono'
import { streamText } from 'hono/streaming'
import { options } from './options'
import { createRouter } from './routes'
import type { CrawleeProps } from './types'

export const crawlerRun = async (props: CrawleeProps) => {
  // const { router, queue } = await createRouter(props)
  const { stream } = props

  const queue = await RequestQueue.open(`${Date.now()}`)
  const router = createPlaywrightRouter()

  const crawler = new PlaywrightCrawler({
    requestHandler: router,
    requestQueue: queue,
    ...options,
  })

  router.addDefaultHandler(async ({ page, pushData, session }) => {
    console.log({ load: page.url() })

    // 特定の要素がレンダリングされるまで待機
    console.log({ selector: props.selector })
    // await page.waitForFunction(
    //   (selector) => {
    //     const div = document.querySelector(selector)
    //     return div && div.innerHTML.trim() !== ''
    //   },
    //   // { timeout: 30000 },
    //   props.selector || 'body',
    // )

    await page.waitForTimeout(props.waitFor || 2000)

    // const hasGtm = await page.evaluate(() => {
    //   const gtm = (window as any).google_tag_manager
    //   if (gtm) {
    //     return true
    //   }
    //   return false
    // })

    // ページ内のすべての<a>タグのリンクを取得
    // biome-ignore lint/security/noGlobalEval: <explanation>
    const links = await eval(`page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map((a) => a.href)
    })`)

    const title = await page.title()
    await pushData({
      url: page.url(),
      title,
      // hasGtm,
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
