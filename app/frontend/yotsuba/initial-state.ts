type Account = {
  acct: string
  avatar: string
  avatar_static: string
  bot: boolean
  created_at: string
  discoverable?: boolean
  display_name: string
  emojis: Emoji[]
  fields: AccountField[]
  followers_count: number
  following_count: number
  group: boolean
  header: string
  header_static: string
  id: string
  last_status_at?: string
  locked: boolean
  note: string
  statuses_count: number
  url: string
  username: string
}

type AccountField = {
  name: string
  value: string
  verified_at: string
}

type Emoji = {
  shortcode: string
  static_url: string
  url: string
}

type InitialState = {
  accounts: Record<string, Account>
  languages: InitialStateLanguage[]
  meta: InitialStateMeta
  local_settings: object

  // glitch-soc-specific "local settings"
  max_toot_chars?: number
  poll_limits?: { max_options: number; max_options_chars: number; min_expiration: number; max_expiration: number }
}

type InitialStateLanguage = [code: string, name: string, localName: string]

type InitialStateMeta = {
  access_token: string
  advanced_layout?: boolean
  auto_play_gif: boolean
  activity_api_enabled: boolean
  admin: string
  boost_modal?: boolean
  crop_images: boolean
  delete_modal?: boolean
  disable_swiping?: boolean
  disabled_account_id?: string
  display_media: boolean
  domain: string
  expand_spoilers?: boolean
  limited_federation_mode: boolean
  locale: string
  mascot: string | null
  me?: string
  moved_to_account_id?: string
  owner?: string
  profile_directory: boolean
  registrations_open: boolean
  reduce_motion: boolean
  repository: string
  search_enabled: boolean
  single_user_mode: boolean
  source_url: string
  streaming_api_base_url: string
  timeline_preview: boolean
  title: string
  trends: boolean
  unfollow_modal: boolean
  use_blurhash: boolean
  use_pending_items?: boolean
  version: string

  // glitch-soc-specific "local settings"
  favourite_modal?: boolean
  default_content_type?: string
  system_emoji_font?: boolean
}

const element = document.getElementById('initial-state')
const initialState: InitialState | undefined = element?.textContent && JSON.parse(element.textContent)

// glitch-soc-specific "local settings"
try {
  initialState!.local_settings = JSON.parse(localStorage.getItem('mastodon-settings') || '{}')
} catch (e) {
  initialState!.local_settings = {}
}

const getMeta = <K extends keyof InitialStateMeta>(prop: K): InitialStateMeta[K] | undefined => {
  return initialState?.meta && initialState.meta[prop]
}

export const activityApiEnabled = getMeta('activity_api_enabled')
export const autoPlayGif = getMeta('auto_play_gif')
export const boostModal = getMeta('boost_modal')
export const cropImages = getMeta('crop_images')
export const deleteModal = getMeta('delete_modal')
export const disableSwiping = getMeta('disable_swiping')
export const disabledAccountId = getMeta('disabled_account_id')
export const displayMedia = getMeta('display_media')
export const domain = getMeta('domain')
export const expandSpoilers = getMeta('expand_spoilers')
export const forceSingleColumn = !getMeta('advanced_layout')
export const limitedFederationMode = getMeta('limited_federation_mode')
export const mascot = getMeta('mascot')
export const me = getMeta('me')
export const movedToAccountId = getMeta('moved_to_account_id')
export const owner = getMeta('owner')
export const profile_directory = getMeta('profile_directory')
export const reduceMotion = getMeta('reduce_motion')
export const registrationsOpen = getMeta('registrations_open')
export const repository = getMeta('repository')
export const searchEnabled = getMeta('search_enabled')
export const showTrends = getMeta('trends')
export const singleUserMode = getMeta('single_user_mode')
export const sourceUrl = getMeta('source_url')
export const timelinePreview = getMeta('timeline_preview')
export const title = getMeta('title')
export const unfollowModal = getMeta('unfollow_modal')
export const useBlurhash = getMeta('use_blurhash')
export const usePendingItems = getMeta('use_pending_items')
export const version = getMeta('version')
export const languages = initialState?.languages

// glitch-soc-specific "local settings"
export const maxChars = (initialState && initialState.max_toot_chars) || 500
export const favouriteModal = getMeta('favourite_modal')
export const pollLimits = (initialState && initialState.poll_limits)
export const defaultContentType = getMeta('default_content_type')
export const useSystemEmojiFont = getMeta('system_emoji_font')

export default initialState
