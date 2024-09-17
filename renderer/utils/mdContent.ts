import { split } from 'lodash-es'

export const mdTitle = (md: string) => {
  const lines = md.split('\n')
  let title = ''
  let n = 0
  for (const line of lines) {
    if (line.startsWith('# ')) {
      n++
      title = line
    }
  }

  if (split(title, '# ').length > 1) {
    let output = split(title, '# ')[1]
    output = output.split('<br>').join('\n')
    return output
  }
  return 'Untitled'
}

export const mdDetail = (markdown: string) => {
  const lines = markdown.split('\n')
  const filteredLines = lines.filter((line) => !line.startsWith('# '))
  return filteredLines.join('\n')
}

export const mdContent = (md: string) => {
  let title = mdTitle(md)

  if (title.includes('<br>')) {
    title = title.split('<br>').join('\n')
  }

  const content = mdDetail(md)
  return {
    title,
    content,
  }
}
