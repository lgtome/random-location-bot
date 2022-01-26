const path = require('path')
const logger = require('./helpers/logger')
const pathToLocalEnv = path.resolve(process.cwd(), '.env.local')
//Solving warning https://github.com/yagop/node-telegram-bot-api/issues/540
require('./server.helpers')
require('dotenv').config({path: pathToLocalEnv})
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.BOT_API, {polling: true})
const app = require('express')()
const PORT = process.env.PORT || 8080

const manager = require('./services/Provider')(bot)
bot.onText(/[a-zA-Z]+$/ig, (msg, match) => {
    const id = msg?.chat?.id
    if (new RegExp(/stop/ig).test(msg?.text)) {
        manager(id).unsubscribe()
        logger('LOG FROM >>> UNSUBSCRIBE')
    } else {
        logger('LOG FROM >>> SUBSCRIBE')
        manager(id).subscribe()
    }
})

app.listen(PORT, () => {
    logger(`server started on ${PORT}`, 'magenta')
})