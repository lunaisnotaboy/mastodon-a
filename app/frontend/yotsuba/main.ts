import * as perf from '@/yotsuba/performance'
import { me } from '@/yotsuba/initial-state'
import ready from '@/yotsuba/ready'

function main() {
  perf.start('main()')

  return ready(async () => {
    const mountNode = document.getElementById('yotsuba')
    const props = JSON.parse(mountNode!.getAttribute('data-props')!)

    perf.stop('main()')
  })
}

export default main
