import path from 'node:path'
import { readJSON as fsReadJson } from 'fs-extra'

export const readJson = (e, fileName: string) => {
  console.log({ resourcesPath: process.resourcesPath })
  const fullPath =
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '..', 'uploads', fileName)
      : path.join(process.resourcesPath, fileName)

  return fsReadJson(fullPath, 'utf-8')
}
