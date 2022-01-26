const cluster = require('cluster')
const {cpus} = require('os')
const logger = require('./helpers/logger')
const pid = process.pid
const threads = cpus().length + 1 - cpus().length
if (cluster.isMaster) {
    for (let i = 0; i < threads; i++) {
        cluster.fork()
        cluster.on('disconnect', () => {
            logger(`worker with pid: ${pid} was killed!`)
            cluster.fork()
            logger(`worker with pid: ${pid} was restored!`)
        })
    }
}

if (cluster.isWorker) {
    require('./index')
}
