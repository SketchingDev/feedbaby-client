module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 6,
        sourceType: "module",
    },
    plugins: [
        "jest",
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "plugin:jest/recommended"
    ],
    env: {
        "jest/globals": true,
        node: true,
        jest: true,
        es6: true,
    },
};
