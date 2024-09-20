import type { Page } from 'playwright'
import type { CrawleeProps } from './types'

type Props = CrawleeProps & {
  page: Page
}

export const pageInfo = async ({ page, waitFor, selector }: Props) => {
  // page.evaluateなどが
  // electronで機能しないためevalでwrapする必要がある

  console.log({ load: page.url() })

  // 特定の要素がレンダリングされるまで待機
  const elm = selector || 'body'
  await eval(`page.waitForFunction(() => {
    const div = document.querySelector('${elm}')
    return div && div.innerHTML.trim() !== ''
  })`)

  await page.waitForTimeout(waitFor || 500)

  const title = await page.title()

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
    hasGtm,
    links,
  }
}
