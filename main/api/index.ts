import type { IpcRenderer } from 'electron'

export const readJsonKey = 'read-json'
export const scrapeUrlKey = 'scrape-url'

export const createApi = (ipcRenderer: IpcRenderer) => {
  return {
    readJson: (filePath: string) => ipcRenderer.invoke(readJsonKey, filePath),
    scrapeUrl: () => ipcRenderer.invoke(scrapeUrlKey),
  }
}

export type ApiType = ReturnType<typeof createApi>
