import yaml from 'js-yaml'

const parseJson = (file) => {
  return JSON.parse(file)
}

const parseYaml = (file) => {
  return yaml.load(file)
}

export { parseJson, parseYaml }