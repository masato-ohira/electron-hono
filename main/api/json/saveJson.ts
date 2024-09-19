import path from 'node:path'
import { app } from 'electron'
import { mkdirsSync, writeJSON } from 'fs-extra'
import { v4 as uuid } from 'uuid'

export const saveJson = () => {
  const userDataPath = app.getPath('userData')
  console.log({ userDataPath })
  mkdirsSync(path.join(userDataPath, 'json'))
  const filePath = path.join(userDataPath, 'json/data.json')

  return writeJSON(filePath, { id: uuid() })
}
