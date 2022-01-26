const colors = require('colors')
const logger = (value, color = 'rainbow') =>
    console.log(colors[color](loggerStringifyTypes(value)))

function loggerStringifyTypes(value) {
    if (typeof value === 'object') return JSON.stringify(value)
    else return value
}

module.exports = logger