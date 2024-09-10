module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'off',
    "no-trailing-spaces": [
      2,
      {
        "skipBlankLines": true,
        "ignoreComments": true
      }
    ],
    "semi": ["error", "always"],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
        "MemberExpression": 1,
        "FunctionDeclaration": { "parameters": "first" }
      }
    ],
    "arrow-body-style": ["error", "as-needed"],
    "array-bracket-spacing": "error",
    "arrow-parens": ["error", "always"],
    "arrow-spacing": "error",
    "block-spacing": "error",
    "brace-style": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "computed-property-spacing": ["error", "never"],
    "jsx-quotes": ["error", "prefer-single"],
    "lines-between-class-members": "warn",
    "no-multi-assign": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
    "no-confusing-arrow": ["error", { "allowParens": true }],
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "one-var-declaration-per-line": "error",
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "class", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "class" },
      { "blankLine": "always", "prev": "cjs-import", "next": "*" },
      { "blankLine": "never", "prev": "cjs-import", "next": ["cjs-import", "import"] },
      { "blankLine": "always", "prev": "import", "next": "*" },
      { "blankLine": "never", "prev": "import", "next": ["import", "cjs-import"] }
    ],
    "prefer-const": "error",
    "prefer-template": "error",
    "quotes": ["error", "single"],
    "rest-spread-spacing": "error",
    "space-before-blocks": ["error", { "functions": "always", "keywords": "always", "classes": "always" }],
    "space-before-function-paren": "error",
    "template-curly-spacing": "error",
      "linebreak-style": [
          "error",
          "windows"
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "global-require": 0,
      "import/no-dynamic-require": 0,
      "no-await-in-loop": 0,
      "class-methods-use-this": 0,
      "import/no-import-module-exports": 0,
      "object-property-newline": 0
  },
};
