import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

/* eslint-disable */
describe('JSON_diff', () => {

    const filepath1 = getFixturePath('firstFile.json')
    const filepath2 = getFixturePath('secondFile.json')

    test('Stylish_by_default', () => {
        const expected = readFile('expectedStylish.text')
        const result = genDiff(filepath1, filepath2)
        expect(result).toBe(expected)
    })
    test('Stylish', () => {
        const expected = readFile('expectedStylish.text')
        const result = genDiff(filepath1, filepath2, 'stylish')
        expect(result).toBe(expected)
    })
    test('Plain', () => {
        const expected = readFile('expectedPlain.text')
        const result = genDiff(filepath1, filepath2, 'plain')
        expect(result).toBe(expected)
    })
    test('Json', () => {
        const expected = readFile('expectedJson.json')
        const result = genDiff(filepath1, filepath2, 'json')
        expect(result).toBe(expected)
    })
})


describe('YAML_diff', () => {

    const filepath1 = getFixturePath('firstFile.yaml')
    const filepath2 = getFixturePath('secondFile.yaml')

    test('Stylish_by_default', () => {
        const expected = readFile('expectedStylish.text')
        const result = genDiff(filepath1, filepath2)
        expect(result).toBe(expected)
    })
})



describe('YML_diff', () => {

    const filepath1 = getFixturePath('firstFile.yml')
    const filepath2 = getFixturePath('secondFile.yml')

    test('Stylish_by_default', () => {
        const expected = readFile('expectedStylish.text')
        const result = genDiff(filepath1, filepath2)
        expect(result).toBe(expected)
    })
})


describe('Errors', () => {

    test('Otput_format_error', () => {
        const filepath1 = getFixturePath('firstFile.yml')
        const filepath2 = getFixturePath('secondFile.yml')
        const falseOtputFormat = 'jso'

        expect(() => {genDiff(filepath1, filepath2, falseOtputFormat)})
        .toThrow(`Unsupported output format '${falseOtputFormat}'. Please use one of the following output formats: [stylish, plain, json]`)
    })
    
    test('File_extention_error', () => {
        const falseExt = path.extname('expectedPlain.text')
        const filepath1 = getFixturePath('firstFile.yml')
        const filepath2 = getFixturePath('expectedPlain.text')

        expect(() => {genDiff(filepath1, filepath2)})
        .toThrow(`Unsupported file extension '${falseExt}'. Please use supported files with extensions ['.json', '.yaml', '.yml'].`)
    })
})


/* eslint-enable */
