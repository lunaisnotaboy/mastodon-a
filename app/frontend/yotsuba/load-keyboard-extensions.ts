// On KaiOS, we may not be able to use a mouse cursor or navigate using Tab-based focus, so we install
// special left/right focus navigation keyboard listeners, at least on public pages (i.e. so folks
// can at least log in using KaiOS devices).

export default async function loadKeyboardExtensions() {
  if (/KAIOS/.test(navigator.userAgent)) {
    const arrowKeyNavigation = await import('arrow-key-navigation')

    arrowKeyNavigation.register()
  }

  return Promise.resolve()
}
