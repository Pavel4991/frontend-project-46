import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { genDiff } from '../src/index.js'
import { parseJson, parseYaml } from '../src/parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

/* eslint-disable */
test('genDiffJson', () => {
    const firstFile = parseJson(readFile('file1.json'))
    const secondFile = parseJson(readFile('file2.json'))
    const result = genDiff(firstFile, secondFile)
    expect(result).toBe(`{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}`)
})

test('genDiffYaml', () => {
    const firstFile = parseYaml(readFile('file1.yaml'))
    const secondFile = parseYaml(readFile('file2.yaml'))
    const result = genDiff(firstFile, secondFile)
    expect(result).toBe(`{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}`)
})
/* eslint-enable */