const API_URL = 'https://api.npmjs.org'
const REGISTRY_API = 'http://registry.npmjs.org'

function parseUrl(url: string, params = {}) {
  return url.replace(/(:\w+)/g, (match, $1) => {
    return params[$1.slice(1)]
  })
}

export type RangeType = [string | undefined, string | undefined]

export type NpmDownloadCount = {
  downloads: { downloads: number; day: string }[]
  start: string
  end: string
  package: string
}

class Http {
  fetch(url, options: RequestInit = {}) {
    return fetch(url, {
      ...options,
      method: options.method || 'GET'
    }).then(r => r.json())
  }
  async getRange(pkg: string, range: RangeType): Promise<NpmDownloadCount> {
    const url = parseUrl('downloads/range/:range/:pkg', {
      pkg,
      range: `${range[0]}:${range[1]}`
    })
    const data = await this.fetch(`${API_URL}/${url}`)
    return data
  }
}

export const http = new Http()
