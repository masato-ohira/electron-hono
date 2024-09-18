import { type IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

export const myApi = {
  readJson: (filePath: string) => ipcRenderer.invoke('read-json', filePath),
  crawl: () => ipcRenderer.invoke('crawl'),
}

contextBridge.exposeInMainWorld('ipc', handler)
contextBridge.exposeInMainWorld('myApi', myApi)

export type IpcHandler = typeof handler
