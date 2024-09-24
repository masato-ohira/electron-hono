import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { toast } from 'sonner'

import { useCrawlee } from '@/hooks/useCrawlee'
import type { CrawleeForm } from '@ts/crawlee'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/utils/cn'
import { isString } from 'lodash-es'
import { FaRegCircleStop } from 'react-icons/fa6'
import { LuLoader2 } from 'react-icons/lu'
import { MdSaveAlt } from 'react-icons/md'

const btnClass = cn(` w-36 h-8 gap-3`)

export const Header = () => {
  const {
    //
    crawleeStart,
    crawleeStop,
    saveCsv,
    loading,
    canceling,
    results,
  } = useCrawlee()

  const { register, watch, getValues } = useFormContext<CrawleeForm>()

  const isDisabled = () => {
    const watchUrl = watch('startUrl')
    if (isString(watchUrl) && watchUrl.startsWith('http')) return false
    if (canceling) return true
    return true
  }

  const showCsv = () => {
    if (loading || canceling || !results) {
      return false
    }
    if (results.items.length > 0) {
      return true
    }
    return false
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
        px-4
        fixed right-0 z-10 top-0
        w-[calc(100%-256px)]
        flex
        bg-gray-100
      `}
    >
      <div className="hstack gap-4 w-full">
        <div className="hstack flex-1 max-w-[480px]">
          <p className={'text-sm'}>対象URL</p>
          <div className="flex-1">
            <Input
              {...register('startUrl')}
              className={`
                w-full
                h-8
                bg-white
                flex-1
                placeholder:text-foreground/30
              `}
              placeholder={'https://example.com'}
            />
          </div>
        </div>
        <Button
          className={btnClass}
          type={'button'}
          disabled={isDisabled()}
          onClick={() => {
            if (loading) {
              crawleeStop()
            } else {
              crawleeStart()
            }
          }}
        >
          {buttonInner()}
        </Button>

        {showCsv() && (
          <Button
            className={btnClass}
            variant={'secondary'}
            type={'button'}
            onClick={saveCsv}
          >
            <MdSaveAlt
              className={`
              text-xl
            `}
            />
            <span>CSV保存</span>
          </Button>
        )}
      </div>
    </header>
  )
}
