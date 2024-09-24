import { useEffect } from 'react'

export const useZoom = () => {
  const handleZoomIn = () => {
    window.electron.zoomIn()
  }

  const handleZoomOut = () => {
    window.electron.zoomOut()
  }

  const handleResetZoom = () => {
    window.electron.resetZoom()
  }

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === '+') {
      handleZoomIn()
    } else if (event.ctrlKey && event.key === '-') {
      handleZoomOut()
    } else if (event.ctrlKey && event.key === '0') {
      handleResetZoom()
    }
  }

  // マウスホイールによるズーム操作
  const handleWheel = (event: WheelEvent) => {
    if (event.ctrlKey) {
      if (event.deltaY < 0) {
        handleZoomIn()
      } else {
        handleZoomOut()
      }
      event.preventDefault()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('wheel', handleWheel)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
    }
  }, [])
}
