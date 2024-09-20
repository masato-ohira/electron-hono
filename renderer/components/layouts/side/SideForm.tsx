import { cn } from '@/utils/cn'
import type { CrawleeForm } from '@ts/crawlee'
import { Input } from '@ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { twc } from 'react-twc'

const Notes = twc.p`
  mt-2 text-xs opacity-70
`

const MenuHead = twc.h2`
  mb-2 font-semibold
`

const inputClass = cn(`
  bg-white text-gray-900
  placeholder:text-gray-900/30
`)

export const SideForm = () => {
  const { register } = useFormContext<CrawleeForm>()
  return (
    <div
      className={`
        px-4
        py-4
        space-y-6
      `}
    >
      <div>
        <MenuHead>Selector</MenuHead>
        <Input
          {...register('selector')}
          className={inputClass}
          defaultValue={'body'}
          placeholder="例: Body"
          type={'text'}
        />
        <Notes>※指定がない場合はbodyのaが対象になります</Notes>
      </div>

      <div>
        <MenuHead>Basic Auth</MenuHead>
        <div className="space-y-4">
          <Input
            {...register('basicUser')}
            className={inputClass}
            placeholder="User"
            type={'text'}
          />
          <Input
            {...register('basicPass')}
            className={inputClass}
            placeholder="Password"
            type={'password'}
          />
        </div>
      </div>

      <div>
        <MenuHead>Max Requests</MenuHead>
        <Input
          {...register('maxRequests')}
          className={inputClass}
          defaultValue={100}
          placeholder="例: 100"
          type={'tel'}
        />
      </div>

      <div>
        <MenuHead>Wait For</MenuHead>
        <Input
          {...register('waitFor')}
          className={inputClass}
          placeholder="例: 1000"
          type={'tel'}
        />
        <Notes>※CSR案件でhtmlの生成に時間差がある場合に指定します</Notes>
      </div>
    </div>
  )
}
