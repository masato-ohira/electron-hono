import { Logo } from './Logo'
import { SideForm } from './SideForm'

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
      <SideForm />
    </aside>
  )
}
