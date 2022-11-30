import axios, { AxiosInstance, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import LinkHeader from 'http-link-header'
import Immutable from 'immutable'
import ready from './ready'

export const getLinks = (response: AxiosResponse): LinkHeader => {
  const value = response.headers.link

  if (!value) {
    return new LinkHeader()
  }

  return LinkHeader.parse(value)
}

const csrfHeader: RawAxiosRequestHeaders = {}

const setCsrfHeader = () => {
  const csrfToken: HTMLMetaElement | null = document.querySelector('meta[name=csrf-token]')

  if (csrfToken) {
    csrfHeader['X-CSRF-Token'] = csrfToken.content
  }
}

ready(setCsrfHeader)

const authorizationHeaderFromState = (getState: () => Immutable.Map<any, any>): RawAxiosRequestHeaders => {
  const accessToken = getState && getState().getIn(['meta', 'access_token'], '') as string | undefined

  if (!accessToken) {
    return {}
  }

  return {
    'Authorization': `Bearer ${accessToken}`
  }
}

export default function api(getState: () => Immutable.Map<any, any>): AxiosInstance {
  return axios.create({
    headers: {
      ...csrfHeader,
      ...authorizationHeaderFromState(getState)
    },
    transformResponse: [
      (data) => {
        try {
          return JSON.parse(data)
        } catch {
          return data
        }
      }
    ]
  })
}
