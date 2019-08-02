module.exports = (acyort) => {
  acyort.util.outputHTML({
    template: 'index',
    path: 'index.html'
  })
  console.log(acyort.config.get())
  acyort.util.copySource()
}
