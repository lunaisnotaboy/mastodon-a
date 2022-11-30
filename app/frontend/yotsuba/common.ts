import Rails from '@rails/ujs'

export function start() {
  import('font-awesome/css/font-awesome.css')

  try {
    Rails.start()
  } catch (e) {
    // If called twice
  }
}
