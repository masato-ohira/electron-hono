import path from 'node:path'
import { app } from 'electron'
import { writeJSON } from 'fs-extra'
import { v4 as uuid } from 'uuid'

export const saveJson = () => {
  const userDataPath = app.getPath('userData')
  console.log({ userDataPath })
  const filePath =
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '..', 'uploads', 'userdata.json')
      : path.join(userDataPath, 'userdata.json')

  return writeJSON(filePath, { id: uuid() })
}
