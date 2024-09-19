import type { IpcRenderer } from 'electron'
import type { CrawleeProps } from './crawlee/types'

export const readJsonKey = 'readJson'
export const saveJsonKey = 'saveJson'
export const scrapeUrlKey = 'scrapeUrl'
export const crawlerRunKey = 'crawlerRun'
export const crawleSiteRunKey = 'crawleSite'

export const createApi = (ipcRenderer: IpcRenderer) => {
  return {
    readJson: async (filePath: string) =>
      ipcRenderer.invoke(readJsonKey, filePath),
    saveJson: async () => ipcRenderer.invoke(saveJsonKey),
    scrapeUrl: () => ipcRenderer.invoke(scrapeUrlKey),
    crawlerRun: async () => ipcRenderer.invoke(crawlerRunKey),
  }
}

export type ApiType = ReturnType<typeof createApi>
