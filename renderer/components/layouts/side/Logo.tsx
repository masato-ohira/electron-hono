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
        center
      `}
    >
      <div className="hstack">
        <IoLogoElectron className={`text-3xl`} />
        <h1
          className={`
              text-xl font-semibold
            `}
        >
          Crawlee Wse
        </h1>
      </div>
    </Link>
  )
}
