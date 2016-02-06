var webpack = require('webpack')

var app = new (require('express'))()
var port = 3000

app.use(function(req, res) {
  res.sendFile(__dirname + '/webapp/view/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
