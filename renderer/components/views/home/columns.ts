import type { ColumnDef } from '@tanstack/react-table'
import type { PageData } from '@ts/crawlee'

const keys: (keyof PageData)[] = [
  'url',
  'hasGtm',
  // 'no404',
  // 'noError',
  'title',
  'description',
  'keywords',
  'ogUrl',
  'ogImage',
]

export const columns: ColumnDef<PageData>[] = keys.map((i) => {
  return {
    accessorKey: i,
    header: i,
  }
})
