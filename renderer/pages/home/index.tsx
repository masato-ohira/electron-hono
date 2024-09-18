import { columns, payments } from '@/components/views/home/data'
import { DataTable } from '@c/views/home/DataTable'

export default function HomePage() {
  return (
    <div className={`bg-white p-8 rounded-md shadow-sm`}>
      <div className={``}>
        <DataTable columns={columns} data={payments} />
      </div>
    </div>
  )
}
