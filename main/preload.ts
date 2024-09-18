import { contextBridge, ipcRenderer } from 'electron'
import { createApi } from './api'

const myApi = createApi(ipcRenderer)
contextBridge.exposeInMainWorld('myApi', myApi)
