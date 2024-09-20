import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { MdMenu } from 'react-icons/md'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

export const Header = () => {
  const { mutate } = useSWRConfig()
  const runToast = async () => {
    // await window.myApi.saveJson()
    toast('Event has been created.', {
      closeButton: true,
    })
    mutate('json/data.json')
  }

  return (
    <header
      className={`
        h-14
        border-b
        hstack
        justify-between
        px-4
        fixed right-0 z-10 top-0
        w-[calc(100%-256px)]
        bg-gray-100
      `}
    >
      <div className="hstack gap-6">
        <MdMenu className={'text-xl text-gray-400'} />
        <p>Home</p>
      </div>

      <div className="hstack justify-end flex-1 gap-4">
        <Input
          className={`
            w-[50%] h-8
            bg-white
            placeholder:text-foreground/30
          `}
          placeholder={'対象URLを入力'}
        />
        <Button
          className={'h-8'}
          type={'button'}
          onClick={() => {
            runToast()
          }}
        >
          クロール開始
        </Button>
      </div>
    </header>
  )
}
