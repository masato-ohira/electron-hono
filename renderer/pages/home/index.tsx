import useSWR from 'swr'

export default function HomePage() {
  const fetcher = async (url: string) => {
    const data = await window.myApi.readJson(url)
    return data
  }

  const { data, isLoading } = useSWR('json/data.json', fetcher)
  if (isLoading) return <>loading...</>
  return (
    <div className={``}>
      <div className={``}>
        <div className="mb-5">
          <div
            onClick={() => {
              console.log('OK')
            }}
            className={`
          bg-primary
          text-white
          p-4
          inline-flex
        `}
          >
            click me
          </div>
        </div>
        {JSON.stringify(data)}
        {/* <div>{JSON.stringify(data)}</div> */}
        {/* <DataTable columns={columns} data={payments} /> */}
      </div>
    </div>
  )
}
