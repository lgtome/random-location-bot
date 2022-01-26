const Provider = (bot, time = 2000) => {
    let INTERVAL_ID = null
    let USER_ID = null
    let USER_TABLE = {}
    return (id) => {

        const handler = () => bot.sendLocation(USER_ID, 50.44970, 30.523720)
        if (USER_ID === id) {
            delete USER_TABLE[id]
            return {
                unsubscribe: () => clearInterval(INTERVAL_ID)
            }
        } else {
            USER_TABLE[id] = 'subscribed'
            USER_ID = id
            return {
                subscribe: () => INTERVAL_ID = setInterval(handler, time),
            }
        }
    }
}
module.exports = Provider