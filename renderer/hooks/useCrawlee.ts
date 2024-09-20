import type { CrawleeResponse } from '@ts/crawlee'
import { atom, useAtom } from 'jotai'
import { json2csv } from 'json-2-csv'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { cn } from '@/utils/cn'
import { honoApi } from '@/utils/fetchers'
import { streamDecode } from '@/utils/streamDecode'

// atoms
// ------------------------------
const $loading = atom(false)
const $canceling = atom(false)
const $res = atom<CrawleeResponse | undefined>()

// hooks
// ------------------------------
export const useCrawlee = () => {
  const [loading, setLoading] = useAtom($loading)
  const [canceling, setCanceling] = useAtom($canceling)
  const [results, setResults] = useAtom($res)

  const { getValues } = useFormContext()

  const crawleeStart = async () => {
    setLoading(true)
    setResults(undefined)
    const query = new URLSearchParams(getValues()).toString()
    const res = await fetch(honoApi(`/api/crawlee?${query}`))
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
      try {
        const chunks = streamDecode(value)
        for (const chunk of chunks) {
          setResults(JSON.parse(chunk) as CrawleeResponse)
        }
      } catch (error) {
        console.log(error)
        toast('予期せぬエラー', {
          closeButton: true,
          className: cn(' text-red-500'),
        })
      }
    }
  }

  const crawleeStop = async () => {
    setCanceling(true)
    await fetch(honoApi('/api/crawlee/cancel'), {
      method: 'POST',
    })
  }

  const saveCsv = async () => {
    const csv = json2csv(results.items)
    console.log(csv)

    // Blobオブジェクトを作成
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

    // ダウンロード用のリンクを作成
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'report.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    crawleeStart,
    crawleeStop,
    saveCsv,

    loading,
    canceling,
    results,
  }
}
