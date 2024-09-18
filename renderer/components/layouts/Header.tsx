import { Button } from '@ui/button'
import { Input } from '@ui/input'
import React from 'react'
import { MdMenu } from 'react-icons/md'

export const Header = () => {
  return (
    <div
      className={`
        h-14
        border-b
        bg-white
        hstack
        justify-between
        px-4
        fixed
        right-0
        top-0
        w-[calc(100%-256px)]
        z-10
      `}
    >
      <div className="hstack gap-6">
        <MdMenu className={'text-xl text-gray-400'} />
        <p>Home</p>
      </div>

      <div className="hstack justify-end flex-1 gap-4">
        <Input
          className={'w-[50%] h-8 placeholder:text-foreground/30'}
          placeholder={'対象URLを入力'}
        />
        <Button className={'h-8'}>クロール開始</Button>
      </div>
    </div>
  )
}
