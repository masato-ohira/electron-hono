import fs from 'fs-extra'
import { globSync } from 'glob'
import { zipObject } from 'lodash-es'
import plugin from 'tailwindcss/plugin'
import type { CSSRuleObject } from 'tailwindcss/types/config'

const tailwindDir = `app/styles`

// 使用しているCustomClass一覧を取得し
// tailwind intellisenceに認識させる
export const twClasses = () => {
  const regex = /\s\s\.([a-zA-Z0-9_-]+)/g
  const targets = [
    ...globSync(`${tailwindDir}/components/**/*.scss`),
    ...globSync(`${tailwindDir}/tailwind/**/*.scss`),
  ]
  const customStyles = targets.map((path) => {
    return fs.readFileSync(path, 'utf-8')
  })
  const classNames = []

  let match
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while ((match = regex.exec(customStyles.join('\n'))) !== null) {
    classNames.push(match[1])
  }

  const keys = classNames.map((i) => `.${i}`)
  const values = classNames.map((i) => {
    return {}
  })
  return zipObject(keys, values)
}

export const classesPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    ...(twClasses() as CSSRuleObject),
  })
})
