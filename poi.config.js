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
  }
}
