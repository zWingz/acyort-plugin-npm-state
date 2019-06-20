module.exports = {
  entry: './src/index',
  plugins: [
    {
      resolve: '@poi/plugin-typescript',
      options: {}
    }
  ],
  configureWebpack: {
    resolve: {
      extensions: ['.less']
    }
  },
  constants: {
    npmRepo: JSON.stringify([
      // '@zzwing/react-image',
      // '@zzwing/react-table',
      // '@zzwing/react-form-wrapper',
      // 'husky-tslint-pre-commit'
      'fundebug-javascript',
      'fundebug-vue',
      'fundebug-wxjs',
      'fundebug-nodejs'
    ])
  }
}
