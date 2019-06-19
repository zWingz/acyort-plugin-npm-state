const BaseUrl = 'https://api.npmjs.org'

function parseUrl(url: string, params = {}) {
  return url.replace(/(:\w+)/g, (match, $1) => {
    return params[$1.slice(1)]
  })
}

type RangeType = 'last-month' | 'last-day' | 'last-week' | string

class Http {
  fetch(url, options: RequestInit = {}) {
    return fetch(`${BaseUrl}/${url}`, {
      ...options,
      method: options.method || 'GET'
    }).then(r => r.json())
  }
  async getRange(pkg: string, range: RangeType) {
    const url = parseUrl('downloads/range/:range/:pkg', {
      pkg,
      range
    })
    console.log(url)
    const data = await this.fetch(url)
    console.log(data)
  }
}

export const http = new Http()
