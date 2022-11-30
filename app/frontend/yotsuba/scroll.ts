const easingOutQuint = (_x: number, t: number, b: number, c: number, d: number) => c * ((t = t / d - 1) * t * t * t * t + 1) + b
const isScrollBehaviorSupported = 'scrollBehavior' in document.documentElement.style
const scrollFn = (node: any, key: string, target: number) => {
  const startTime = Date.now()
  const offset = node[key]
  const gap = target - offset
  const duration = 1000
  let interrupt = false

  const step = () => {
    const elapsed = Date.now() - startTime
    const percentage = elapsed / duration

    if (percentage > 1 || interrupt) {
      return
    }

    node[key] = easingOutQuint(0, elapsed, offset, gap, duration)
    requestAnimationFrame(step)
  }

  step()

  return () => {
    interrupt = true
  }
}

export const scrollRight = (node: any, position: number) => isScrollBehaviorSupported ? node.scrollTo({ left: position, behavior: 'smooth' }) : scrollFn(node, 'scrollLeft', position)
export const scrollTop = (node: any) => isScrollBehaviorSupported ? node.scrollTo({ top: 0, behavior: 'smooth' }) : scrollFn(node, 'scrollTop', 0)
