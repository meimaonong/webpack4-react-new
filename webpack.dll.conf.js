const path = require('path')
const webpack = require('webpack')

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 需要打包dll组件列表
let vArr = [
    'react', 
    'react-dom', 
    'axios', 
    'react-redux', 
    'react-router-dom', 
    'react-router-redux', 
    'redux'
]

// 目录配置
const Dir = require('./config/dir.conf')
// ENV判断
const isProd = process.env.NODE_ENV === 'production' ? true : false
// mode
const mode = isProd ? 'production' : 'development'
// filename
const filename = isProd ? 'vendor.dll.[hash:8].js' : 'vendor.dll.dev.[hash:8].js'
// filejson
const filejson = isProd ? 'vendor-manifest.json' : 'vendor-manifest-dev.json'
// vendor
const vendor = isProd ? 'vendor.html' : 'vendor-dev.html'
// subfolder
const subfolder = isProd ? 'prod' : 'dev'
// plugins
const plugins = isProd ? [
    new CleanWebpackPlugin(
        [
            `${Dir.dist}/vendor/${subfolder}`
        ],
        {
            root: Dir.root,
            verbose: true,
            dry: false
        }
    ),
] : []

module.exports = {
    entry: {
        vendor: vArr
    },
    mode,
    output: {
        path: Dir.dist,
        filename: `[name]/${subfolder}/${filename}`,
        library: '[name]'
    },
    optimization: {
        minimize: isProd
    },
    plugins: [
        ...plugins,
        new webpack.DllPlugin({
            path: `${Dir.dist}/[name]/${subfolder}/${filejson}`,
            name: '[name]'
        }),
        new HtmlWebpackPlugin({
            filename: `${Dir.tpl}/${vendor}`,
            template: `${Dir.tpl}/tpl.html`,
            chunks: ['vendor']
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: `vendor/${subfolder}/report.html`
        })
    ]
}
