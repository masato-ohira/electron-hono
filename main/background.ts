import path from 'node:path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { readJSON } from 'fs-extra'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}
;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)

    // mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.handle('read-json', async (event, fileName: string) => {
  console.log({ resourcesPath: process.resourcesPath })
  const fullPath =
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '..', 'resources', fileName)
      : path.join(process.resourcesPath, fileName)

  return readJSON(fullPath, 'utf-8')
})
