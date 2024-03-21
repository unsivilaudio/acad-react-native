/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
    root: true,
    extends: ['universe/native'],
    rules: {
        'react/jsx-no-bind': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': 'off',
        'import/order': 'off',
    },
};
