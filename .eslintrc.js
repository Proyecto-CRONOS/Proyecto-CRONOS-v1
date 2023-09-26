module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  'settings': {
    'import/ignore': ['react-native'],
    'react': {
      'version': 'detect',
    }
  },
  /* FIXME
  'import/order': [
    'error',
    {
      'groups': ['builtin', 'external', 'internal'],
      'pathGroups': [
        {
          'pattern': 'react',
          'group': 'external',
          'position': 'before',
        }
      ],
      'pathGroupsExcludedImportTypes': ['react'],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true,
      }
    }
  ],
  */
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'import',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    // 'linebreak-style': [
    //     'error',
    //     'unix'
    // ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
    'react/react-in-jsx-scope': 'off',
  },
}
