// const Cookies = require('js-cookie')

const fetcher = options => new Promise((resolve, reject) => {
    // const csrftoken = Cookies.get('csrftoken')
    const defaults = {
        credentials: 'include',
          headers: new Headers({
            // 'X-CSRFToken': csrftoken,
            'X-Requested-With': 'XMLHttpRequest'
          })
      }

    if (options.method === 'POST') {
        let body
        if (options.data instanceof FormData) {
            body = options.data
        } else {
            body = new FormData()
            for (let key in options.data) {
                if (Array.isArray(options.data[key])) {
                    options.data[key].forEach(element => {
                        body.append(key + '[]', element)
                    })
                } else {
                    body.append(key, options.data[key])
                }
            }
        }
        Object.assign(defaults, { body, method: 'POST' })
    }

    return fetch(options.url, defaults).then(response => {
        if (response.status >= 400) {
            response.json().then(response => reject(response))
        } else {
            resolve(response.json())
        }
    })
})

export default fetcher
