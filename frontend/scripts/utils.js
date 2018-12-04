import urlRegex from 'url-regex'


export const getLocation = () => {
  return location.protocol + '//' + location.host + '/'
}

const preprocessURL = longURL => {
  const protocolRegex = /^(http|https):\/\//
  const hasProtocol = protocolRegex.test(longURL)

  if (!hasProtocol) {
    longURL = 'http://' + longURL
  }

  return longURL
}

const checkURLAgainstRegex = URL => {
  if (urlRegex().test(URL)) {
    return true
  }
  return false
}

export const validateURL = longURL => {
  // check if it passes RegEx test; if so, just return it. Otherwise, add a protocol to the beginning.
  // If that still fails, then it's truly invalid and we give an error
  if (checkURLAgainstRegex(longURL)) {
    return longURL
  } else {
    longURL = preprocessURL(longURL)

    if (checkURLAgainstRegex(longURL)) {
      return longURL
    }
  }

  return false
}