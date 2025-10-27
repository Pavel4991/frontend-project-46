import makeStylish from './stylish.js'
import makePlain from './plain.js'
import makeJson from './json.js'

const selectFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return makeStylish
    case 'plain':
      return makePlain
    case 'json':
      return makeJson
  }
}

export default selectFormatter
