import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { toast } from 'sonner'

import { useCrawlee } from '@/hooks/useCrawlee'
import type { CrawleeForm } from '@ts/crawlee'
import { useFormContext } from 'react-hook-form'

import { isString } from 'lodash-es'
import { FaRegCircleStop } from 'react-icons/fa6'
import { LuLoader2 } from 'react-icons/lu'
import { MdSaveAlt } from 'react-icons/md'

export const Header = () => {
  const { crawleeStart, crawleeStop, loading, canceling } = useCrawlee()
  const { register, watch, getValues } = useFormContext<CrawleeForm>()

  const isDisabled = () => {
    const watchUrl = watch('startUrl')
    if (isString(watchUrl) && watchUrl.startsWith('http')) return false
    if (canceling) return true
    return true
  }

  const buttonInner = () => {
    switch (true) {
      case canceling:
        return <LuLoader2 className={'animate-spin'} />
      case loading:
        return <FaRegCircleStop />
      default:
        return <>クロール開始</>
    }
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
      <div className="hstack gap-4">
        <Input
          {...register('startUrl')}
          className={`
            w-[33vw] h-8
            bg-white
            placeholder:text-foreground/30
          `}
          placeholder={'対象URLを入力（https://example.com）'}
        />
        <Button
          className={'h-8 w-40'}
          type={'button'}
          disabled={isDisabled()}
          onClick={() => {
            if (loading) {
              crawleeStop()
            } else {
              crawleeStart(getValues('startUrl'))
            }
          }}
        >
          {buttonInner()}
        </Button>

        <Button
          className={'h-8 w-40 gap-2'}
          variant={'secondary'}
          type={'button'}
        >
          <MdSaveAlt
            className={`
              text-xl
            `}
          />
          CSV保存
        </Button>
      </div>
    </header>
  )
}
