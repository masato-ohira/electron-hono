import type { Page } from 'playwright'
import type { CrawleeProps } from './types'

type Props = CrawleeProps & {
  page: Page
}

export const pageInfo = async ({ page, waitFor, selector }: Props) => {
  // page.evaluateなどが
  // electronで機能しないためevalでwrapする必要がある
  // tsが効かず今のところ綺麗な方法がない

  console.log({ load: page.url() })

  const errors: any[] = []
  const responses: any[] = []

  page.on('pageerror', (exception) => {
    errors.push(exception)
  })
  page.on('response', (response) => {
    responses.push(response)
  })

  // 特定の要素がレンダリングされるまで待機
  const elm = selector || 'body'
  await eval(`page.waitForFunction(() => {
    const div = document.querySelector('${elm}')
    return div && div.innerHTML.trim() !== ''
  })`)

  // ページを下までスクロール
  await eval(`page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })`)

  await page.waitForTimeout(waitFor || 500)

  const getMeta = async (target: string) => {
    try {
      return await page.$eval(target, (element) => {
        return element.getAttribute('content')
      })
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  // meta情報の取得
  const title = await page.title()
  const description = await getMeta(`meta[name="description"]`)
  const keywords = await getMeta(`meta[name="keywords"]`)
  const ogUrl = await getMeta(`meta[property="og:url"]`)
  const ogImage = await getMeta(`meta[property="og:image"]`)

  // エラーのチェック
  let no404 = true
  for (const response of responses) {
    if (response.status() === 404) {
      no404 = false
      break
    }
  }

  const noError = errors.length === 0

  // gtmの存在確認
  const hasGtm = await eval(`page.evaluate(() => {
    const gtm = window.google_tag_manager
    if (gtm) {
      return true
    }
    return false
  })`)

  // ページ内のすべての<a>タグのリンクを取得
  const links = await eval(`page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map((a) => a.href)
  })`)

  return {
    title,
    description,
    keywords,
    hasGtm,
    ogUrl,
    ogImage,
    // no404,
    // noError,
    links,
  }
}
