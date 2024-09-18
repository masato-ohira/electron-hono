declare global {
  interface Window {
    api: Sandbox
  }
}

export interface Sandbox {
  readJson: (
    path: string,
  ) => Promise<Record<string, string | number | undefined>[]>
}
