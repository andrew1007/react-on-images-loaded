module.exports = {
    'preset': 'ts-jest',
    'collectCoverageFrom': [
        // 'src/**/*.{js,jsx,ts,tsx}',
        // '!**/*.d.ts',
    ],
    'coveragePathIgnorePatterns': [
        // '/node_modules/',
        // '__IntegrationTests__',
        // '/__Tests__',
        // 'declarations.ts',
        // 'src/index.tsx',
        // 'src/registerServiceWorker.ts',
        // 'src/Components/Home/News',
        // 'src/Boilerplate',
        // 'src/Services',
        // 'src/Api'
    ],
    'setupFiles': [
        // '<rootDir>/config/polyfills.js',
    ],
    'setupFilesAfterEnv': [
        './setupTests.ts',
        'jest-expect-message',
    ],
    // 'testMatch': [
    //     '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
    //     '<rootDir>/src/**/?(*.)(spec|test).(j|t)s?(x)',
    //     '<rootDir>/src/**/__Tests__/**/*.(spec|test).(j|t)s?(x)',
    //     '<rootDir>/src/**/__IntegrationTests__/**/*.(spec|test).(j|t)s?(x)',
    // ],
    'testEnvironment': 'jsdom',
    'testURL': 'http://localhost',
    'transform': {
        // '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
        // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        // '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },
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
    // 'modulePathIgnorePatterns': [
    //     '<rootDir>/ani-query',
    //     '<rootDir>/ani-query-cache',
    // ],
};
