import type { ColumnDef } from '@tanstack/react-table'
import { random, times } from 'lodash-es'
import { v4 as uuid } from 'uuid'

type Payment = {
  id: string
  url: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    accessorKey: 'status',
    header: 'ステータス',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: '数量',
  },
]

export const payments: Payment[] = times(100, (n) => {
  // const id = uuid()
  return {
    id: `key-${n}`,
    url: `https://example.com/${n + 1 * 1000}/${n + 1 * 1000}/${n + 1 * 1000}/`,
    amount: n + 1,
    status: 'pending',
    email: 'mail:@example.com',
  }
})
