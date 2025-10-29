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
    default:
      throw new Error(`Unsupported output format '${format}'. Please use one of the following output formats: [stylish, plain, json]`)
  }
}

export default selectFormatter
