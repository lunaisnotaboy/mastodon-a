export default class Settings {
  public keyBase: string | null

  constructor(keyBase: string | null = null) {
    this.keyBase = keyBase
  }

  public generateKey(id: string) {
    return this.keyBase ? [this.keyBase, `id${id}`].join('.') : id
  }

  public get(id: string) {
    const key = this.generateKey(id)

    try {
      const rawData = localStorage.getItem(key)

      return rawData ? JSON.parse(rawData) : null
    } catch (e) {
      return null
    }
  }

  public remove(id: string) {
    const data = this.get(id)

    if (data) {
      const key = this.generateKey(id)

      try {
        localStorage.removeItem(key)
      } catch (e) {}
    }

    return data
  }

  public set(id: string, data: any) {
    const key = this.generateKey(id)

    try {
      const encodedData = JSON.stringify(data)

      localStorage.setItem(key, encodedData)

      return data
    } catch (e) {
      return null
    }
  }
}

export const bannerSettings = new Settings('yotsuba_banner_settings')
export const pushNotificationsSetting = new Settings('yotsuba_push_notification_data')
export const tagHistory = new Settings('yotsuba_tag_history')
