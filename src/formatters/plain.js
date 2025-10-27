const makePlain = (diff) => {

  const iter = (diff, pathPart = '') => {
    const keys = Object.keys(diff)

    const checkValue = (value) => {
      if (typeof value === 'boolean' || value === null) {
        return value
      }
      if (typeof value !== 'object') {
        return `'${value}'`
      }
      return '[complex value]'
    }

    return keys.reduce((acc, key) => {
      const status = diff[key].status
      const value = diff[key].value

      switch (status) {
          case 'removed':
            acc += `Property '${pathPart}${key}' was removed\n`
            break
          case 'added':
            acc += `Property '${pathPart}${key}' was added with value: ${checkValue(value)}\n`
            break
          case 'updated':
            acc += `Property '${pathPart}${key}' was updated. From ${checkValue(value[0])} to ${checkValue(value[1])}\n`
            break
          case 'unchanged':
            acc += iter(value, `${pathPart}${key}.`)
            break
      }
      
      return acc
    }, '')
  }

  const plainDiff = iter(diff)
  
  return plainDiff.trimEnd()
}

export default makePlain