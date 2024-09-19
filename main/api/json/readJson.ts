import path from 'node:path'
import { app } from 'electron'
import { readJSON as fsReadJson } from 'fs-extra'

export const readJson = (e, fileName: string) => {
  const userDataPath = app.getPath('userData')
  console.log({ userDataPath })
  const fullPath = path.join(userDataPath, fileName)

  return fsReadJson(fullPath, 'utf-8')
}
