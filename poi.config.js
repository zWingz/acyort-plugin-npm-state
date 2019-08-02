const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index',
  output: {
    dir: 'templates',
    minimize: false,
    publicUrl: '.',
    fileNames: {
      js: 'source/script/[name].js',
      css: 'source/css/[name].css'
    },
    html: {
      template: isProduction ? './index.tpl.html' : undefined,
      filename: 'layout/index.html',
      inject: false
    }
  },
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
  constants: isProduction ? undefined : {
    npmRepo: JSON.stringify([
      '@zzwing/react-image',
      '@zzwing/react-table',
      '@zzwing/react-form-wrapper',
      'husky-tslint-pre-commit'
    ])
  }
}
