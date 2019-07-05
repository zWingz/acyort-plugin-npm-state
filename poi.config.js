module.exports = {
  entry: './src/index',
  plugins: [
    {
      resolve: '@poi/plugin-typescript',
      options: {
        babel: true
      }
    }
  ],
  babel: {
  },
  configureWebpack(config) {
    config.resolve.extensions.push('.less')
    return config
  },
  constants: {
    npmRepo: JSON.stringify([
      '@zzwing/react-image',
      '@zzwing/react-table',
      '@zzwing/react-form-wrapper',
      'husky-tslint-pre-commit'
      // 'fundebug-javascript',
      // 'fundebug-vue',
      // 'fundebug-wxjs',
      // 'fundebug-nodejs'
    ])
  }
}
