import { contextBridge, webFrame } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  zoomIn: () => webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1),
  zoomOut: () => webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.1),
  resetZoom: () => webFrame.setZoomFactor(1),
})
