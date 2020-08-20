module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('svg')
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Kanban board'
        args[0].meta = { viewport: 'width=device-width,initial-scale=1.0' }
        return args
      })
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    }
  },
  transpileDependencies: ['vuex-persist']
}
