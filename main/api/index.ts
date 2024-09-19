import type { IpcRenderer } from 'electron'

export const readJsonKey = 'readJson'
export const saveJsonKey = 'saveJson'
export const scrapeUrlKey = 'scrapeUrl'

export const createApi = (ipcRenderer: IpcRenderer) => {
  return {
    readJson: async (filePath: string) =>
      ipcRenderer.invoke(readJsonKey, filePath),
    saveJson: async () => ipcRenderer.invoke(saveJsonKey),
    scrapeUrl: () => ipcRenderer.invoke(scrapeUrlKey),
  }
}

export type ApiType = ReturnType<typeof createApi>
