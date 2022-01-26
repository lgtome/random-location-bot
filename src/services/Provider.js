const getRandomData = require('../helpers/getRandomGeoData')
const {longitude, latitude} = require('../utils/CONSTANTS')

const Provider = (bot, time = 4000) => {
    let INTERVAL_ID = {}
    let USER_TABLE = {}
    const intervalHandler = (id) => () => bot.sendLocation(id,
        getRandomData(latitude.min, latitude.max),
        getRandomData(longitude.min, longitude.max))
    return (id) => {
        if (!!USER_TABLE[id]) {
            return {
                unsubscribe: () => {
                    clearInterval(INTERVAL_ID[id])
                    delete USER_TABLE[id]
                }
            }
        } else {
            USER_TABLE[id] = 'subscribed'
            return {
                subscribe: () => INTERVAL_ID[id] = setInterval(intervalHandler(id), time),
            }
        }
    }
}
const Provider2 = (bot, time = 4000) => {
    let INTERVAL_ID = {}
    let USER_TABLE = {}
    const intervalHandler = (id) => () => bot.sendLocation(id,
        getRandomData(latitude.min, latitude.max),
        getRandomData(longitude.min, longitude.max))
    return (id) => {
        return {
            subscribe: () => {
                if (USER_TABLE[id]) return
                USER_TABLE[id] = 'subscribed'
                INTERVAL_ID[id] = setInterval(intervalHandler(id), time)
            },
            unsubscribe: () => {
                clearInterval(INTERVAL_ID[id])
                delete USER_TABLE[id]
            }
        }
    }
}
module.exports = Provider2