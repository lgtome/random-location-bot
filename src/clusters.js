const cluster = require('cluster')
const {cpus} = require('os')
const pid = process.pid
const threads = cpus().length + 1 - cpus().length
if (cluster.isMaster) {
    for (let i = 0; i < threads; i++) {
        cluster.fork()
        cluster.on('disconnect', () => {
            console.warn(`worker with pid: ${pid} was killed!`)
            cluster.fork()
            console.log(`worker with pid: ${pid} was restored!`)
        })
    }
}

if (cluster.isWorker) {
    require('./index')
}
