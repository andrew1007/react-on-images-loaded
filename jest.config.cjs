module.exports = {
    'preset': 'ts-jest',
    'collectCoverageFrom': [],
    'coveragePathIgnorePatterns': [],
    'setupFiles': [],
    'setupFilesAfterEnv': [
        './setupTests.ts',
    ],
    'testEnvironment': 'jsdom',
    'testURL': 'http://localhost',
    'transform': {},
    'transformIgnorePatterns': [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',
    ],
    'modulePaths': ['src'],
    'moduleNameMapper': {
        '^react-native$': 'react-native-web',
    },
    'moduleFileExtensions': [
        'web.ts',
        'ts',
        'web.tsx',
        'tsx',
        'web.js',
        'js',
        'web.jsx',
        'jsx',
        'json',
        'node',
        'mjs',
    ],
    'globals': {
        'ts-jest': {
            'tsconfig': './tsconfig.json',
            'isolatedModules': true,
        },
    },
    'watchPlugins': [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    'testRunner': 'jest-circus/runner',
};
