import { Toaster } from '@ui/sonner'
import type { HTMLProps, ReactNode } from 'react'
import { Header } from './Header'
import { SideNav } from './side/SideNav'

type LayoutProps = HTMLProps<HTMLDivElement>

export const Layout = (props: LayoutProps) => {
  const { children, ...rest } = props
  return (
    <div {...rest}>
      <div
        className={`
          relative
          pl-64
        `}
      >
        <SideNav />
        <div className={'flex-1 pt-14'}>
          <Header />
          <main
            className={`
              p-8
            `}
          >
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
