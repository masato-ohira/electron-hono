import type { myApi } from '@@/main/preload'

declare global {
  interface Window {
    myApi: typeof myApi
  }
}
