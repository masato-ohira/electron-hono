import { honoApi } from '@/utils/fetchers'
import { streamDecode } from '@/utils/streamDecode'
import type { CrawleeResponse } from '@ts/crawlee'
import { atom, useAtom } from 'jotai'
import { toast } from 'sonner'
import { cn } from '../utils/cn'

const $loading = atom(false)
const $canceling = atom(false)
const $res = atom<CrawleeResponse | undefined>()

export const useCrawlee = () => {
  const [loading, setLoading] = useAtom($loading)
  const [canceling, setCanceling] = useAtom($canceling)
  const [results, setResults] = useAtom($res)

  const crawleeStart = async (url: string) => {
    setLoading(true)
    setResults(undefined)
    const res = await fetch(honoApi(`/api/crawlee?url=${url}`))
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
          console.log(chunk)
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

  return {
    crawleeStart,
    crawleeStop,

    loading,
    canceling,
    results,
  }
}
