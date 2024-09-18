import path from 'node:path'
import { app } from 'electron'
import fs from 'fs-extra'

export const getChromiumPath = () => {
  const execPath = app.getPath('exe')
  const baseDir = path.dirname(execPath)
  const chromiumPath = path.join(baseDir, 'electron')

  return chromiumPath
  // throw new Error('Chromium executable not found.')
}
