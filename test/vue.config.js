module.exports = {
    baseUrl: './',
    publicPath: './',
    outputDir: 'dist',//是否在保存时检查
    pwa: {},
    // dll: {},
    devServer: {
        host: "0.0.0.0",
        port: 881,
        proxy: null,
        hotOnly: false,
        https: false,
        before: app => {},
        clientLogLevel: 'info'
    },
    //第三方插件
    pluginOptions: {

    },
    transpileDependencies: ['webpack-dev-server/client'],
	chainWebpack: config => {
        config.entry.app = ['babel-polyfill', './src/main.js'];
	}
}