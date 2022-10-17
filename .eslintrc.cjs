module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6:true
  },
  extends: [
    'airbnb-base',
    'plugin:tailwindcss/recommended',
    // "plugin:react/recommended",
    "airbnb",
    "plugin:import/typescript", // this is needed because airbnb uses eslint-plugin-import
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "eslint:recommended",
  ],


  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.tsx', '.jsx', '.js']
      },
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    allowImportExportEverywhere: true,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'tailwindcss',
  ],
  rules: {
    "import/no-unresolved": [
      2,
      {"caseSensitive": false}
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "linebreak-style": 0,
    "react/prop-types": 0,
    "tailwindcss/classnames-order": "error",
    "tailwindcss/enforces-negative-arbitrary-values": "error",
    "tailwindcss/enforces-shorthand": "error",
    "import/prefer-default-export": "off",
    "tailwindcss/no-arbitrary-value": "off",
    "tailwindcss/no-custom-classname": 'off',
    "tailwindcss/no-contradicting-classname": "error",
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never',
        'tsx': 'never',
      },
    ],
    'import/no-cycle': 'off',
  },
};
