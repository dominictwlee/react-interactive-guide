module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [
      2,
      'always',
      [
        'lower-case', // default
        'upper-case', // UPPERCASE
        'camel-case', // camelCase
        'pascal-case', // PascalCase
        'sentence-case', // Sentence case
        'start-case', // Start Case
      ],
    ],
  },
};
