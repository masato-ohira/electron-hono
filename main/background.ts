import path from 'node:path'
import { serve as honoServe } from '@hono/node-server'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { crawlerRunKey, readJsonKey, saveJsonKey, scrapeUrlKey } from './api'
import { hono } from './api/hono'
import { readJson } from './api/json/readJson'
import { saveJson } from './api/json/saveJson'
import { crawlSite, scrapeUrl } from './api/playwright'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}
;(async () => {
  await app.whenReady()

  honoServe({
    fetch: hono.fetch,
    port: 8787, // Port number, default is 3000
  })

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

ipcMain.handle(readJsonKey, readJson)
ipcMain.handle(saveJsonKey, saveJson)
ipcMain.handle(scrapeUrlKey, scrapeUrl)
ipcMain.handle(crawlerRunKey, crawlSite)
