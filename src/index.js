require('dotenv').config()
const Telegram = require('telegraf/telegram')
const bot = new Telegram(process.env.TELEGRAM_CHANNELBOT)
const readPath = process.argv[2] || `${__dirname}/../dist/data.json`
const consola = require('consola')

consola.info('data reading from: ', readPath)

const channelID = process.env.TELEGRAM_CHATID
const { getAllLikesSince, getLatestLikeId } = require('./utils/twitter')
const { writeData, readData } = require('./utils/io') 
const { RateLimit } = require('async-sema');
const lim = RateLimit(7, { timeUnit: '60000' })

// Telegram allow 30 message/s, channel however, said 20 message / minute
// This slow down the process, as each tweet can have upto 4 message so each time it is safe to process
// ~5 tweet/minutes
const main = async (last_acquired) => {
    const likes = await getAllLikesSince(last_acquired)
    const messages = []
    // We cannot do map: we need rate limits
    for (const tweet of likes) {
        consola.info('tweet for: ', tweet)
        const template = `${tweet.text}

<a href="${tweet.link}">Tweet</a> by <a href="${tweet.user.link}">@${tweet.user.username}</a> ${tweet.nsfw ? '#possiblyNSFW' : ''}`
        if (tweet.media.length !== 0) {
            // we need to double check if type are matched: video only or image only
            let mediaGroup = tweet.media
            const v = tweet.media.filter(e => e.type === 'video')
            if (v.length > 0) {
                mediaGroup = v
            }
            mediaGroup[0] = {
                caption: template,
                parse_mode: 'html',
                ...mediaGroup[0]
            }
            consola.info('build message: ', mediaGroup)

            await lim()
            messages.push(bot.sendMediaGroup(channelID, mediaGroup))
            continue
        }

        await lim()
        messages.push(bot.sendMessage(channelID, template, {
            parse_mode: 'html'
        }))
    }

    return Promise.all(messages)
}

const reset = async () => {
    const res = await getLatestLikeId().catch(e => {
        consola.error(e)
    })
    const d =  { last_acquired: res }
    consola.info('write first time data: ', d)
    writeData(readPath, d)
    consola.success('finished processed')
}

const rec = readData(readPath)

consola.info('data read: ', rec)

if (rec) {
    main(rec).then(() => {
        consola.success('finished processed')
    }).catch(e => {
        consola.error(e)
    }).finally(() => {
        reset()
    })
} else {
    reset()
}