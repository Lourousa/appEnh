const express = require('express')
const routerEnh = require('./routesEnh/enh')

const app = express()

const port = 3000

app.use((req, res, next) => {
  express.json()(req, res, next)
})
app.use(express.urlencoded({extended: false}))
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, jsonwebtoken, Content-Type, Content-Range, Content-Disposition, Content-Description');
    //res.setHeader('Access-Control-Expose-Headers', 'content-type, Content-Disposition, filename');
    //res.setHeader('Access-Control-Allow-Credentials', false);
    next()
});

process.on('uncaughtException', (ex) => {
    console.log("UncaughtException " + ex + " " + ex.stack)
});

app.use('/enh', routerEnh)

let server = app.listen(port, function() {
    console.log('AppEnh started on port ' + port)
})
 
server.setTimeout(1800000)
