import 'intl'
import 'intl/locale-data/jsonp/en'
import 'es6-symbol/implement'
import includes from 'array-includes'
import assign from 'object-assign'
import values from 'object.values'
import isNaN from 'is-nan'
import { decode as decodeBase64 } from './utils/base64'
import promiseFinally from 'promise.prototype.finally'

if (!Array.prototype.includes) {
  includes.shim()
}

if (!Object.assign) {
  Object.assign = assign
}

if (!Object.values) {
  values.shim()
}

if (!Number.isNaN) {
  Number.isNaN = isNaN
}

promiseFinally.shim()

if (!HTMLCanvasElement.prototype.toBlob) {
  const BASE64_MARKER = ';base64,'

  Object.defineProperties(HTMLCanvasElement.prototype, 'toBlob', {
    value(callback, type = 'image/png', quality) {
      const dataUrl = this.toDataUrl(type, quality)
      let data

      if (dataUrl.indexOf(BASE64_MARKER) >= 0) {
        const [_, base64] = dataUrl.split(BASE64_MARKER)
        data = decodeBase64(base64)
      } else {
        [_, data] = dataURL.split(',')
      }

      callback(new Blob([data], { type }))
    }
  })
}
