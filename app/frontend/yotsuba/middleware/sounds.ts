const createAudio = (sources: { src: string, type: string }[]) => {
  const audio = new Audio()

  sources.forEach(({ type, src }) => {
    const source = document.createElement('source')
    source.type = type
    source.src = src

    audio.appendChild(source)
  })

  return audio
}

const play = (audio: HTMLAudioElement) => {
  if (!audio.paused) {
    audio.pause()

    if (typeof audio.fastSeek === 'function') {
      audio.fastSeek(0)
    } else {
      audio.currentTime = 0
    }
  }

  audio.play()
}

export default function soundsMiddleware() {
  const soundCache = {
    boop: createAudio([
      {
        src: '/sounds/boop.ogg',
        type: 'audio/ogg'
      },
      {
        src: '/sounds/boop.mp3',
        type: 'audio/mpeg'
      }
    ])
  }

  return () => (next: any) => (action: any) => {
    if (action.meta && action.meta.sound && (soundCache as any)[action.meta.sound]) {
      play((soundCache as any)[action.meta.sound])
    }

    return next(action)
  }
}
