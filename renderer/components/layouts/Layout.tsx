import { Toaster } from '@ui/sonner'
import type { HTMLProps } from 'react'
import { Header } from './Header'
import { SideNav } from './side/SideNav'

import type { CrawleeForm } from '@ts/crawlee'
import { FormProvider, useForm } from 'react-hook-form'

type LayoutProps = HTMLProps<HTMLDivElement>

export const Layout = (props: LayoutProps) => {
  const { children, ...rest } = props
  const methods = useForm<CrawleeForm>()

  return (
    <FormProvider {...methods}>
      <div {...rest}>
        <div
          className={`
          relative
          pl-64
        `}
        >
          <SideNav />
          <div
            className={`
              flex-1 pt-14
            `}
          >
            <Header />
            <main
              className={`
              p-8
              h-[calc(100vh-56px)]
              overflow-y-auto
              scrollbar-thumb-gray-300
              scrollbar-track-gray-100
              scrollbar-thin
            `}
            >
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </FormProvider>
  )
}
