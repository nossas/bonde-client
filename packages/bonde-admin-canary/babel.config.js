// babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env', {
            modules: 'commonjs'
        }],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-class-properties'
    ]
}
