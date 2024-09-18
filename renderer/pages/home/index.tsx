import useSWR from 'swr'

export default function HomePage() {
  const fetcher = async (url: string) => {
    const data = await window.myApi.scrapeUrl()
    return data
  }

  const { data, isLoading } = useSWR('json/posts.json', fetcher)
  if (isLoading) return <>loading...</>
  return (
    <div className={``}>
      <div className={``}>
        {JSON.stringify(data)}
        {/* <div>{JSON.stringify(data)}</div> */}
        {/* <DataTable columns={columns} data={payments} /> */}
      </div>
    </div>
  )
}
