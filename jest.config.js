module.exports = {
  roots: ["src"],
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'svelte'],
  coverageDirectory: './ut-coverage',
  testPathIgnorePatterns: ["utils.js"]
};
