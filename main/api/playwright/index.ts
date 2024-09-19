import { Hono } from 'hono'
import { type Page, chromium } from 'playwright'

type PageProps = {
  page: Page
  url: string
  startUrl: string
  visited?: Set<string>
}

const crawlPage = async ({
  page,
  url,
  startUrl,
  visited = new Set(),
}: PageProps) => {
  if (visited.has(url)) return
  visited.add(url)
  await page.goto(url)
  const title = await page.title()
  console.log({ url, title })

  await page.waitForTimeout(2000)

  // ページ内のリンクを取得
  // biome-ignore lint/security/noGlobalEval: <explanation>
  const links = await eval(`page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map((a) => a.href)
  })`)

  for (const link of links) {
    // 取得したリンクが同じドメインであれば再帰的にクロール
    if (link.startsWith(startUrl) && !visited.has(link)) {
      await crawlPage({
        page,
        url: link,
        startUrl,
        visited,
      })
    }
  }
}

const crawlSite = async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
  })

  try {
    const page = await browser.newPage()
    const startUrl = 'https://www.okeihan.net/recommend/hatsumoude/'
    const res = await crawlPage({
      page,
      url: startUrl,
      startUrl,
    })
    // await page.goto(startUrl)
    // const res = await page.title()
    return res
  } catch (error) {
    console.error({ error })
  } finally {
    await browser.close()
  }
}

const app = new Hono()
app.get('/', async (c) => {
  const data = await crawlSite()
  return c.json({
    data,
  })
})

export default app
