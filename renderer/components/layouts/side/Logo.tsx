import Link from 'next/link'
import React from 'react'
import { IoLogoElectron } from 'react-icons/io5'

export const Logo = () => {
  return (
    <Link
      href={'/home'}
      className={`
        h-14
        border-b
        border-white/20
        flex
        items-center
        px-4
      `}
    >
      <div className="hstack">
        <IoLogoElectron className={`text-3xl text-lime-300`} />
        <h1
          className={`
              text-xl font-semibold
            `}
        >
          Playwright Wse
        </h1>
      </div>
    </Link>
  )
}
