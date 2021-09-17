const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, json } = format;

var logger = createLogger({
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.File({ filename: './logs/general.log' }),
        new transports.Console()
    ]
})

var httpsLogger = createLogger({
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.File({ filename: './logs/https.log' }),
        new transports.Console()
    ]
})

var expressLogger = createLogger({
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.File({ filename: './logs/express.log' }),
        new transports.Console()
    ]
})

// var mktCamLogger = createLogger({
//     format: combine(
//         timestamp(),
//         json()
//     ),
//     transports: [
//         new winston.transports.File({ filename: './logs/marketingCampaign.log' }),
//         new transports.Console()
//     ]
// })


// var sslCrawlerLogger = createLogger({
//     format: combine(
//         timestamp(),
//         json()
//     ),
//     transports: [
//         new winston.transports.File({ filename: './logs/sslCrawlerError.log' }),
//         new transports.Console()
//     ]
// })

// var sslCrawlerInfoLogger = createLogger({
//     format: combine(
//         timestamp(),
//         json()
//     ),
//     transports: [
//         new winston.transports.File({ filename: './logs/sslCrawlerInfo.log' }),
//         new transports.Console()
//     ]
// })

// var session = createLogger({
//     format: combine(
//         timestamp(),
//         json()
//     ),
//     transports: [
//         new winston.transports.File({ filename: './logs/session.log' }),
//         new transports.Console()
//     ]
// })

var mailer = createLogger({
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.File({ filename: './logs/mailer.log' }),
        new transports.Console()
    ]
})

/**
 * 
 * @param {Object|Error} data 
 * @param {Error|String} data.error
 */
function exception(data) {
    let err = {
        ...data.error
    }
    if (data instanceof Error) {
        err["name"] = data.name || "NA"
        err["message"] = data.message || "NA"
        err["stack"] = data.stack || "NA"
        err["code"] = data.code || "NA"
        err["reason"] = data.reason || "NA"
        data.error = err
        db.ref("exception").push(data)
    } else if (data.error instanceof Error) {
        err["name"] = data.error.name || "NA"
        err["message"] = data.error.message || "NA"
        err["stack"] = data.error.stack || "NA"
        err["code"] = data.error.code || "NA"
        err["reason"] = data.error.reason || "NA"
        data.error = err
        db.ref("exception").push(data)
    } else {
        if (typeof data.error == "object") {
            err["name"] = data.error.name || "NA"
            err["message"] = data.error.message || "NA"
            err["stack"] = data.error.stack || "NA"
            err["code"] = data.error.code || "NA"
            err["reason"] = data.error.reason || "NA"
            data.error = err
            db.ref("exception").push(data)
        } else if (data.error) {
            data.error = data.error.toString()
            db.ref("exception").push(data)
        } else {
            console.log("================Unable to log Exception error==================")
            console.log(data)
            console.log("===============================================================")
        }
    }
}

function middleware(filename) {
    return createLogger({
        format: combine(
            timestamp(),
            json()
        ),
        transports: [
            new winston.transports.File({ filename: './logs/express-' + filename + '.log' }),
            new transports.Console()
        ]
    })
}

function router(filename) {
    return createLogger({
        format: combine(
            timestamp(),
            json()
        ),
        transports: [
            new winston.transports.File({ filename: './logs/router-' + filename + '.log' }),
            new transports.Console()
        ]
    })
}

function service(filename) {
    return createLogger({
        format: combine(
            timestamp(),
            json()
        ),
        transports: [
            new winston.transports.File({ filename: './logs/service-' + filename + '.log' }),
            new transports.Console()
        ]
    })
}

logger.info("------------Logger Started: " + Date.now() + "------------")

function init() {
    return new Promise((resolve, reject) => {
        resolve(true)
    })
}


exports.init = init
exports.set = logger
exports.https = httpsLogger
exports.express = expressLogger
// exports.mktCamLogger = mktCamLogger
// exports.sslCrawlerLogger = sslCrawlerLogger
// exports.sslCrawlerInfoLogger = sslCrawlerInfoLogger
// exports.session = session
exports.mailer = mailer
exports.middleware = middleware
exports.exception = exception
exports.router = router
exports.service = service