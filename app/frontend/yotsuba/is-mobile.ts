import { supportsPassiveEvents } from 'detect-passive-events'
import { forceSingleColumn } from '@/yotsuba/initial-state'

const LAYOUT_BREAKPOINT = 630

export const isMobile = (width: number) => width <= LAYOUT_BREAKPOINT

export const layoutFromWindow = (layoutLocalSetting: string) => {
  switch (layoutLocalSetting) {
    case 'multiple':
      return 'multi-column'
    case 'single':
      if (isMobile(window.innerWidth)) {
        return 'mobile'
      } else {
        return 'single-column'
      }
    default:
      if (isMobile(window.innerHeight)) {
        return 'mobile'
      } else if (forceSingleColumn) {
        return 'single-column'
      } else {
        return 'multi-column'
      }
  }
}

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
const listenerOptions = supportsPassiveEvents ? { passive: true } : false
let userTouching = false

const touchListener = () => {
  userTouching = true

  window.removeEventListener('touchstart', touchListener, (listenerOptions as any))
}

window.addEventListener('touchstart', touchListener, listenerOptions)

export const isIOS = () => iOS
export const isUserTouching = () => userTouching
