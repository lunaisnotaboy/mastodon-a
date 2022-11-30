import loadPolyfills from '@/yotsuba/load-polyfills'
import { start } from '@/yotsuba/common'

start()

loadPolyfills().then(async () => {
  const { default: main } = await import('@/yotsuba/main')

  return main()
}).catch(e => {
  console.error(e)
})
