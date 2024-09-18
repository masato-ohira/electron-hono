import { type IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'
import { fetchJson } from './api/fetchJson'

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

const api = {
  readJson: (filePath: string) => ipcRenderer.invoke('read-json', filePath),
}

contextBridge.exposeInMainWorld('ipc', handler)
contextBridge.exposeInMainWorld('api', api)

export type IpcHandler = typeof handler
