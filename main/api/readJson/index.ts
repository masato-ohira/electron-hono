import path from 'node:path'
import type { IpcMainInvokeEvent } from 'electron'
import { readJSON as fsReadJson } from 'fs-extra'

export const readJson = (event: IpcMainInvokeEvent, fileName: string) => {
  console.log({ resourcesPath: process.resourcesPath })
  const fullPath =
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '..', 'resources', fileName)
      : path.join(process.resourcesPath, fileName)

  return fsReadJson(fullPath, 'utf-8')
}
