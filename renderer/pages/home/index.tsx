import { streamDecode } from '@/utils/streamDecode'
import { useState } from 'react'

import type { CrawleeResponse } from '@/@types'
import { cn } from '@/utils/cn'
import { honoApi } from '@/utils/fetchers'
import { toast } from 'sonner'

import { DataTable } from '@c/views/home/DataTable'
import { columns } from '@c/views/home/columns'
import { Button } from '@ui/button'
import { uniqBy } from 'lodash-es'
import { LuLoader2 } from 'react-icons/lu'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [canceling, setCanceling] = useState(false)
  const [results, setResults] = useState<CrawleeResponse | undefined>()

  const fetchStart = async () => {
    getStream()
  }

  const loadingText = () => {
    switch (true) {
      case canceling:
        return 'キャンセルしています...'
      case loading:
        return 'しばらくお待ち下さい...'
      default:
        return ''
    }
  }

  const getStream = async () => {
    setLoading(true)
    setResults(undefined)
    const res = await fetch(honoApi('/api/crawlee'))
    const reader = res.body?.getReader()

    if (!reader) return
    while (true) {
      const { done, value } = await reader.read()
      // done が true になったらストリーミングが完了したことを意味する
      if (done) {
        console.log('isDone')
        setLoading(false)
        setCanceling(false)
        toast('処理が完了しました', {
          closeButton: true,
        })
        return
      }
      if (!value) continue
      const chunks = streamDecode(value)
      for (const chunk of chunks) {
        setResults(JSON.parse(chunk) as CrawleeResponse)
      }
    }
  }

  return (
    <div className={`space-y-3`}>
      <div className="hstack gap-6">
        <Button
          onClick={fetchStart}
          className={cn(`
          w-40
          ${loading ? 'pointer-events-none' : ''}
        `)}
        >
          {loading ? (
            <LuLoader2 className={'animate-spin'} />
          ) : (
            <>クロール開始</>
          )}
        </Button>

        {loading && (
          <Button
            variant={'secondary'}
            disabled={canceling}
            onClick={async () => {
              setCanceling(true)
              await fetch(honoApi('/api/crawlee/cancel'), {
                method: 'POST',
              })
            }}
            className={`w-40`}
          >
            キャンセル
          </Button>
        )}
      </div>

      {(loading || canceling) && <div>{loadingText()}</div>}

      {results && (
        <DataTable columns={columns} data={uniqBy(results.items, 'url')} />
      )}
    </div>
  )
}
