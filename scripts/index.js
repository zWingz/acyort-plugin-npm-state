module.exports = (acyort) => {
  acyort.util.outputHTML({
    template: 'index',
    path: 'index.html'
  })
  acyort.util.copySource()
}
