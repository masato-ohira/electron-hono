import useSWR from 'swr'

export default function HomePage() {
  const fetcher = async (url: string) => {
    const res = await fetch('http://localhost:8787/api')
    const data = await res.json()
    console.log(data)
    return data
  }

  const { data, isLoading } = useSWR('/api', fetcher)
  if (isLoading) return <>loading...</>
  return (
    <div className={``}>
      <div className={``}>
        <div className="mb-5">
          <div
            // onClick={async () => {
            //   await window.myApi.crawlerRun({
            //     startUrl: 'https://www.okeihan.net/recommend/hatsumoude/',
            //     selector: '#react-app',
            //   })
            // }}
            className={`
              cursor-pointer
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
