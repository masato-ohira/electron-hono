import Link from 'next/link'
import { IoLogoElectron } from 'react-icons/io5'
import { Logo } from './Logo'
import { SideMenu } from './SideMenu'

export const SideNav = () => {
  return (
    <aside
      className={`
        bg-gray-800
        text-white
        min-h-screen
        w-64
        fixed
        left-0
        top-0
      `}
    >
      <Logo />
      <SideMenu />
    </aside>
  )
}
