export default function ready(callback: (() => void) | (() => Promise<void>)): Promise<void> {
  return new Promise((resolve, reject) => {
    function loaded() {
      let result: void | Promise<void>

      try {
        result = callback()
      } catch (err) {
        reject(err)

        return
      }

      if (typeof (result as any).then === 'function') {
        (result as any).then(resolve).catch(reject)
      } else {
        resolve()
      }
    }

    if (['interactive', 'complete'].includes(document.readyState)) {
      loaded()
    } else {
      document.addEventListener('DOMContentLoaded', loaded)
    }
  })
}
