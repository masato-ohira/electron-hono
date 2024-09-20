import { useState } from 'react'

import type { CrawleeResponse } from '@ts/crawlee'

import { useCrawlee } from '@/hooks/useCrawlee'
import { DataTable } from '@c/views/home/DataTable'
import { columns } from '@c/views/home/columns'
import { divide, uniqBy } from 'lodash-es'
import { LuLoader2 } from 'react-icons/lu'

export default function HomePage() {
  const { loading, canceling, results } = useCrawlee()

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

  return (
    <div className={`space-y-3`}>
      <div className={'hstack justify-between'}>
        <div>
          {(loading || canceling) && (
            <div className={`hstack gap-3`}>
              <LuLoader2 className={'animate-spin text-2xl text-primary'} />
              <span>{loadingText()}</span>
            </div>
          )}
        </div>
        {results && <div>{results.items.length}ページ</div>}
      </div>

      {results && (
        <DataTable columns={columns} data={uniqBy(results.items, 'url')} />
      )}

      {!results && !loading && (
        <p
          className={`
            center
            text-2xl
            min-h-32
          `}
        >
          NO DATA
        </p>
      )}
    </div>
  )
}
