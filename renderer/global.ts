export {}

declare global {
  interface Window {
    electron: {
      zoomIn: () => void
      zoomOut: () => void
      resetZoom: () => void
    }
  }
}
