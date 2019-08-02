module.exports = (acyort) => {
  console.log('starting...')
  acyort.util.outputHTML({
    template: 'index',
    path: 'index.html'
  })
  console.log('done')
  acyort.util.copySource()
}
