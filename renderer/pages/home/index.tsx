import { useEffect, useState } from 'react'

export default function HomePage() {
  const [json, setJson] = useState([])

  const fetchJson = async () => {
    const data = await window.api.readJson('json/posts.json')
    console.log(data)
    setJson(data)
  }

  useEffect(() => {
    fetchJson()
  }, [])

  return (
    <div className={``}>
      <div className={``}>
        {JSON.stringify(json)}
        {/* <div>{JSON.stringify(data)}</div> */}
        {/* <DataTable columns={columns} data={payments} /> */}
      </div>
    </div>
  )
}
