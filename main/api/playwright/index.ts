import { type Browser, type Page, chromium, devices } from 'playwright'
import { getChromiumPath } from './path'

export const scrapeUrl = async () => {
  // ElectronのChromiumバイナリのパスを指定
  const browser = await chromium.launch({
    channel: 'chrome',
  })

  try {
    const page = await browser.newPage()
    await page.goto('https://example.com')
    const title = await page.title()
    return title
  } catch (error) {
    console.log({ error })
    return 'error'
  } finally {
    browser.close()
  }
}

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

  await page.waitForTimeout(1000)

  // ページ内のリンクを取得
  // biome-ignore lint/security/noGlobalEval: <explanation>
  const links = await eval(`this.page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map((a) => a.href)
  })`)

  for (const link of links) {
    // 取得したリンクが同じドメインであれば再帰的にクロール
    if (link.startsWith(startUrl) && !visited.has(link)) {
      await crawlPage({
        page,
        url,
        startUrl,
        visited,
      })
    }
  }
}

export const crawlSite = async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
  })

  try {
    const page = await browser.newPage()
    const startUrl = 'https://www.okeihan.net/recommend/hatsumoude/'
    await crawlPage({
      page,
      url: startUrl,
      startUrl,
    }) // クロールを開始するURL
  } catch (error) {
    console.error({ error })
  } finally {
    await browser.close()
  }
}
