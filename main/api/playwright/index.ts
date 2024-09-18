import { chromium, devices } from 'playwright'
import { getChromiumPath } from './path'

export const crawl = async () => {
  // ElectronのChromiumバイナリのパスを指定
  const browser = await chromium.launch({
    // executablePath: getChromiumPath(),
    channel: devices['Desktop Chrome'].defaultBrowserType,
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
