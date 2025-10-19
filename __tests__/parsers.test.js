import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import { parseJson, parseYaml } from '../src/parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

/* eslint-disable */
test('parseJson', () => {
    const fileJson = readFile('file1.json')
    expect(parseJson(fileJson)).toEqual({
        host: "hexlet.io",
        timeout: 50,
        proxy: "123.234.53.22",
        follow: false
    })
})

test('parseYaml', () => {
    const fileYaml = readFile('file1.yaml')
    expect(parseYaml(fileYaml)).toEqual({
        host: "hexlet.io",
        timeout: 50,
        proxy: "123.234.53.22",
        follow: false
    })
})
/* eslint-enable */