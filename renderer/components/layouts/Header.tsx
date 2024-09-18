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
        p-4
      `}
    >
      <div className="hstack gap-6">
        <MdMenu className={'text-xl text-gray-400'} />
        <p>Home</p>
      </div>
    </div>
  )
}
