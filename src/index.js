const path = require('path')
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
    if (new RegExp(/stop/ig).test(msg?.text)) {
        manager(msg?.chat?.id).unsubscribe()
        console.log('STOP FROM INDEX > IF')
    } else {
        console.log('STOP FROM INDEX >>> AFTER IF')
        manager(msg?.chat?.id).subscribe()
    }
})

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})