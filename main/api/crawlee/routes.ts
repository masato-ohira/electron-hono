import { RequestQueue, createPlaywrightRouter } from 'crawlee'
import type { CrawleeProps } from './types'

export const createRouter = async (props: CrawleeProps) => {
  const queue = await RequestQueue.open()
  const router = createPlaywrightRouter()

  router.addDefaultHandler(async ({ page, pushData }) => {
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

    const hasGtm = await page.evaluate(() => {
      const gtm = (window as any).google_tag_manager
      if (gtm) {
        return true
      }
      return false
    })

    // ページ内のすべての<a>タグのリンクを取得
    const links = await page.evaluate((props) => {
      return Array.from(document.querySelectorAll('a'))
        .map((anchor) => anchor.href)
        .filter(
          (href) =>
            typeof href === 'string' &&
            href.startsWith(props.startUrl) &&
            !href.includes('.pdf'),
        )
    }, props)

    const title = await page.title()
    await pushData({
      url: page.url(),
      title,
      hasGtm,
    })

    // リンクをキューに追加
    for (const link of links) {
      await queue.addRequest({ url: link })
    }
  })

  return {
    router,
    queue,
  }
}
