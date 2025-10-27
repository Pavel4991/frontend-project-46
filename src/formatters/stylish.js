const makeStylish = (diff, indentMultiplier = 1) => {
  const keys = Object.keys(diff)
  const indentSymbol = '  '
  const indent = indentSymbol.repeat(indentMultiplier)

  const checkValue = (value) => {
    if (typeof value !== 'object' || value === null) {
      return value
    }
    return makeStylish(value, indentMultiplier + 2)
  }

  const stylishDiff = keys.reduce((acc, key) => {
    const status = diff[key].status
    const value = diff[key].value

    switch (status) {
        case 'removed':
          acc += `${indent}- ${key}: ${checkValue(value)}\n`
          break
        case 'added':
          acc += `${indent}+ ${key}: ${checkValue(value)}\n`
          break
        case 'updated':
          acc += `${indent}- ${key}: ${checkValue(value[0])}\n` + `${indent}+ ${key}: ${checkValue(value[1])}\n`
          break
        case 'unchanged':
          acc += `${indent}  ${key}: ${checkValue(value)}\n`
          break
        case 'nested':
          acc += `${indent}  ${key}: ${checkValue(value)}\n`
          break
    }
    return acc
  }, '')
  
  return `{\n${stylishDiff}${indentSymbol.repeat(indentMultiplier - 1)}}`
}

export default makeStylish