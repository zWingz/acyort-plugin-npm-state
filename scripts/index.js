module.exports = (acyort) => {
  acyort.util.outputHTML({
    template: 'index',
    path: 'index.html'
  })
  const config = acyort.config.get()
  console.log(config);
  acyort.util.copySource()
}
