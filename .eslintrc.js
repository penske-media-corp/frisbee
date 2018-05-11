module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: [
    'standard',
  ],
  rules: {
    complexity: ['error', 10],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', {
      code: 80,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
    }],
    'no-console': 'error'
  }
};
