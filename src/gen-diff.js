import _ from 'lodash'
import selectFormatter from './formatters/index.js'
import parseByExt from './parsers.js'
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), { encoding: 'utf8', flag: 'r' })
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), { encoding: 'utf8', flag: 'r' })

  const parsedFile1 = parseByExt(file1, filepath1)
  const parsedFile2 = parseByExt(file2, filepath2)

  const iter = (file1, file2) => {
    const keys = _.union(_.keys(file1), _.keys(file2))
      .sort((a, b) => ('' + a).localeCompare(('' + b), { sensitivity: 'base' }))

    const checkValue = (value) => {
      if (typeof value !== 'object' || value === null) {
        return value
      }
      const keys = Object.keys(value)
      return keys.reduce((acc, key) => {
        return { ...acc, [key]: { status: 'nested', value: checkValue(value[key]) } }
      }, {})
    }

    const diff = keys
      .reduce((acc, key) => {
        if (!Object.hasOwn(file2, key)) {
          return { ...acc, [key]: { status: 'removed', value: checkValue(file1[key]) } }
        }
        if (!Object.hasOwn(file1, key)) {
          return { ...acc, [key]: { status: 'added', value: checkValue(file2[key]) } }
        }

        if (typeof file1[key] === 'object' && typeof file2[key] === 'object' && !_.isEqual(file1[key], file2[key])) {
          return ({ ...acc, [key]: { status: 'unchanged', value: iter(file1[key], file2[key]) } })
        }

        if (file1[key] !== file2[key]) {
          return { ...acc, [key]: { status: 'updated', value: [checkValue(file1[key]), checkValue(file2[key])] } }
        }
        return { ...acc, [key]: { status: 'unchanged', value: file1[key] } }
      }, {})
    return diff
  }

  const diff = iter(parsedFile1, parsedFile2)
  const formatter = selectFormatter(format)

  return formatter(diff)
}

export default genDiff