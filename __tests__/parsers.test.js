import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import parseByExt from '../src/parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

/* eslint-disable */
describe('Parse_file_by_extension', () => {

    const expected = JSON.parse(readFile('firstFile.json'))

    test('parseJson', () => {
        const fileJson = readFile('firstFile.json')
        expect(parseByExt(fileJson, 'firstFile.json')).toEqual(expected)
    })

    test('parseYaml', () => {
        const fileJson = readFile('firstFile.yaml')
        expect(parseByExt(fileJson, 'firstFile.yaml')).toEqual(expected)
    })

    test('parseYml', () => {
        const fileJson = readFile('firstFile.yml')
        expect(parseByExt(fileJson, 'firstFile.yml')).toEqual(expected)
    })
})
/* eslint-enable */