import { Button } from '@ui/button'
import { useState } from 'react'
import useSWR from 'swr'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const fetchStart = async () => {
    setLoading(true)
    const res = await fetch('http://localhost:8787/api/crawlee')
    const json = await res.json()
    setLoading(false)
    setResults(json)
  }

  // const { data, isLoading } = useSWR('/api/json', fetcher)
  // if (isLoading) return <>loading...</>
  return (
    <div className={``}>
      <Button onClick={fetchStart}>クロール開始</Button>

      <div className="mt-4">
        {loading ? <div>loading...</div> : <div>{JSON.stringify(results)}</div>}
      </div>
    </div>
  )
}
