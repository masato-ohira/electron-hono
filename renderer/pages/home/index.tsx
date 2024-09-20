import { Button } from '@ui/button'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<string>('')
  const [results, setResults] = useState<any[]>([])
  const fetchStart = async () => {
    // setLoading(true)
    // const res = await fetch('http://localhost:8787/api/crawlee')
    // const json = await res.json()
    // setLoading(false)
    // setResults(json)

    getStream()
  }

  const getStream = async () => {
    const response = await fetch('http://localhost:8787/api/crawlee')
    const reader = response.body?.getReader()
    if (!reader) return
    const decoder = new TextDecoder()
    while (true) {
      // レスポンスのストリーミングを読み込む
      const { done, value } = await reader.read()
      // done が true になったらストリーミングが完了したことを意味する
      if (done) {
        console.log('isDone')
        // setIsGenerating(false);
        return
      }
      if (!value) continue
      const lines = decoder.decode(value)
      const chunks = lines
        .split('data: ') // 各行は data: というキーワードで始まる
        .map((line) => line.trim())
        .filter((s) => s) // 余計な空行を取り除く

      console.log({ chunks })
      for (const chunk of chunks) {
        // 文章のチャンクが到着するたびにチャットの履歴の最後の要素（AI アシスタントのメッセージ）に追加する
        setMessages(chunk)
      }
    }
  }

  // useEffect(() => {
  //   getStream()
  // }, [])

  // const { data, isLoading } = useSWR('/api/json', fetcher)
  // if (isLoading) return <>loading...</>
  return (
    <div className={``}>
      <Button onClick={fetchStart}>クロール開始</Button>
      <div className={'mt-3'}>{messages}</div>

      {/* <Button onClick={fetchStart}>クロール開始</Button>

      <div className="mt-4">
        {loading ? <div>loading...</div> : <div>{JSON.stringify(results)}</div>}
      </div> */}
    </div>
  )
}
