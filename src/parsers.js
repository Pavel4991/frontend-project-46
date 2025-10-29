import yaml from 'js-yaml'
import path from 'node:path'

const parseJson = (file) => {
  return JSON.parse(file)
}

const parseYaml = (file) => {
  return yaml.load(file)
}

const parseByExt = (file, filepath) => {
  const extension = path.extname(filepath)
  switch (extension) {
    case '.json':
      return parseJson(file)
    case '.yaml':
      return parseYaml(file)
    case '.yml':
      return parseYaml(file)
    default:
      throw new Error(`Unsupported file extension '${extension}'. Please use supported files with extensions ['.json', '.yaml', '.yml'].`)
  }
}

export default parseByExt
