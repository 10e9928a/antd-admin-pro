import fs from 'node:fs'
import antfu from '@antfu/eslint-config'

const autoImportGlobalsPath = new URL('./types/.eslintrc-auto-import.json', import.meta.url)
const autoImportGlobals = fs.existsSync(autoImportGlobalsPath)
  ? JSON.parse(fs.readFileSync(autoImportGlobalsPath, 'utf-8')).globals
  : {}

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      'types/auto-imports.d.ts',
      'types/components.d.ts',
      'types/.eslintrc-auto-import.json',
      'dist',
      'public',
      'mock',
      '.vscode',
    ],
  },
  {
    languageOptions: {
      globals: autoImportGlobals,
    },
    rules: {
      'no-console': 'off',
    },
  },
)
