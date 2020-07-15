import Telegraf from 'telegraf'
import { processNewVideos, fetchVideosFromFeed, Video } from './processNewVideos'

let cachedVideos: Video[] = []

process.env.NTBA_FIX_319 = '1'
const feedUrl = process.env.YOUTUBE_FEED_URL as string
const TOKEN = process.env.TELEGRAM_NOTIFIER_TOKEN as string
const CHAT_ID = process.env.TELEGRAM_CHAT_ID as string
const NOTIFIER_MESSAGE = process.env.TELEGRAM_NOTIFIER_MESSAGE
const bot = new Telegraf(TOKEN)

const postNewVideo = (video: Video) => {
  const message = `${NOTIFIER_MESSAGE} ${video.url}`
  bot.telegram
    .sendMessage(CHAT_ID, message)
    .then(() => {
      console.log(message)
    })
    .catch(console.error)
}

const saveVideos = (newVideos: Video[]) => {
  cachedVideos = newVideos
  return cachedVideos
}

fetchVideosFromFeed(feedUrl)
  .then(saveVideos)
  .then((videosFromFeed) => {
    console.log(`Cache loaded with ${videosFromFeed.length} videos.`)
    console.log('Starting...')

    setInterval(() => {
      fetchVideosFromFeed(feedUrl).then((videosFromFeed) => {
        processNewVideos(postNewVideo, videosFromFeed, cachedVideos).then(saveVideos)
      })
    }, 1 * 60 * 1000)
  })
