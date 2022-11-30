let marky: typeof import('marky')

if (_DEV_) {
  if (typeof performance !== 'undefined') {
    // Increase Firefox's performance entry limit; otherwise it's capped to 150
    // SEE: https://bugzilla.mozilla.org/show_bug.cgi?id=1331135
    performance.setResourceTimingBufferSize(Infinity)
  }

  marky = import('marky')
}

export function start(name: any) {
  if (_DEV_) {
    marky.mark(name)
  }
}

export function stop(name: any) {
  if (_DEV_) {
    marky.stop(name)
  }
}
