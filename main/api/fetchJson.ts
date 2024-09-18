import fs from 'fs-extra'

export const fetchJson = async () => {
  const data = fs.readJSONSync('./posts.json')
  return data
}
