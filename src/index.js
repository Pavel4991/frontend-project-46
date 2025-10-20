const genDiff = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 }).toSorted()
  const diff = keys.reduce((acc, key) => {
      if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
        return [...acc, [`  - ${key}: ${file1[key]}`]]
      }
      if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        return [...acc, [`  + ${key}: ${file2[key]}`]]
      }
      if (file1[key] !== file2[key]) {
        return [...acc, [`  - ${key}: ${file1[key]}`], [`  + ${key}: ${file2[key]}`]]
      }
      return [...acc, [`    ${key}: ${file1[key]}`]]
    }, [])
    .join('\n')
  return `{\n${diff}\n}`
}

export { genDiff }

