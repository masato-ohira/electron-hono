import type { ApiType } from '../main/api'

declare global {
  interface Window {
    myApi: ApiType
  }
}
