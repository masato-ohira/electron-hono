import { ceil } from 'lodash-es'
import type { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config'

type SizeConf = ResolvableTo<KeyValuePair<string, [string, string]>>

const fontRatio = 0.625
const rem = (size: number) => {
  return `${ceil(size * 0.1 * fontRatio, 4)}rem`
}

export const fontSize: SizeConf = {
  '2xs': [rem(10), '1.8'],
  xs: [rem(12), '1.8'],
  sm: [rem(14), '1.8'],
  base: [rem(16), '1.8'],
  lg: [rem(18), '1.4'],
  xl: [rem(20), '1.4'],
  '2xl': [rem(24), '1.3'],
  '2.5xl': [rem(28), '1.3'],
  '3xl': [rem(32), '1.3'],
  '3.5xl': [rem(36), '1.3'],
  '4xl': [rem(40), '1.2'],
  '4.5xl': [rem(48), '1.2'],
  '5xl': [rem(54), '1.2'],
  '6xl': [rem(64), '1.1'],
  '7xl': [rem(72), '1'],
  '7.5xl': [rem(80), '1'],
  '8xl': [rem(96), '1'],
  '9xl': [rem(128), '1'],
}
