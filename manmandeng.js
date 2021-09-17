
console.log(`Worker ${process.pid} started`)
// Workers can share any TCP connection
// In this case it is an HTTP server

//------------Import Library
const fs = require("fs")
// const config = require("./server/config/config")
const express = require('express');
const app = express()

const http = require('http').createServer(app);
const path = require("path")


app.disable('x-powered-by')
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
// exports.httpsServer = https





const util = require("./server/util/util")
const logger = require("./server/services/logger")
// acme().then(data=>{
//     console.log(data)
// }).catch(error=>{
//     console.log(error)
// })
// const auth = require("./server/services/auth")
// const util = require("./server/util/util")
// const crypto = require("./server/services/crypto")
// const chatroom = require("./server/services/chatroom")
// const tenant = require("./server/services/tenant")
// const mailer = require("./server/services/mailer")



// ------------Turn on Web Server


http.listen(334, function () {
    console.log('listening on *:334');
});

app.use("/", function (req, res, next) {
    let clientIp = req.headers['x-forwarded-for'] ||req.socket.remoteAddress

    logger.service("visitor").info(` | ${clientIp} | ${req.protocol}://${req.hostname}${req.socket.localPort ? ":" + req.socket.localPort : ""}${req.originalUrl}`)
    next()
})

app.use("/",
    express.static(path.join(__dirname, 'public'), { index: 'index.html', extensions: ['html'] })
)
app.use("/404",
    express.static(path.join(__dirname, 'public'), { index: '404.html', extensions: ['html'] })
)

// Redirect from http to https
// app.use(function (req, res, next) {
//     if (req.secure) {
//         next();
//     } else {
//         if (req.url.includes("api")) {
//             next()
//         } else {
//             return res.redirect('https://' + req.headers.host + req.originalUrl);
//         }
//     }
// });






//404 & 500 Handling
app.use(function (req, res, next) {
    return res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

app.use(function (err, req, res, next) {
    let requestId = util.idGenerator({ length: 50 })
    console.log(requestId, err)
    return res.status(500).json({ code: -1, desc: "Opps, Something went wrong! If you know how to contact us, send us the ID: " + requestId });
});




