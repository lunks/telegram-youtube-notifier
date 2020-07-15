import Telegraf from 'telegraf'
import { processNewVideos, fetchVideosFromFeed, Video } from './processNewVideos'
import { TelegrafContext } from 'telegraf/typings/context'

let cachedVideos: Video[] = []

const postNewVideo = (bot: Telegraf<TelegrafContext>, chatIds: string, message: string) => (video: Video) => {
  const messageToPost = `${message} ${video.url}`
  chatIds.split(',').forEach((chatId) => {
    bot.telegram
      .sendMessage(chatId, messageToPost)
      .then(() => {
        console.log(messageToPost)
      })
      .catch(console.error)
  })
}

const saveVideos = (newVideos: Video[]) => {
  cachedVideos = newVideos
  return cachedVideos
}

export interface Notifier {
  (options: { telegramToken: string; telegramChatIds: string; youtubeChannelId: string; message: string }): void
}

const notifier: Notifier = ({ telegramToken, telegramChatIds, youtubeChannelId, message }) => {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelId}`
  console.log(`Monitoring feed ${feedUrl}`)
  const bot = new Telegraf(telegramToken)

  fetchVideosFromFeed(feedUrl)
    .then(saveVideos)
    .then((videosFromFeed) => {
      console.log(`Cache loaded with ${videosFromFeed.length} videos.`)
      console.log('Starting...')

      setInterval(() => {
        fetchVideosFromFeed(feedUrl).then((videosFromFeed) => {
          processNewVideos(postNewVideo(bot, telegramChatIds, message), videosFromFeed, cachedVideos).then(saveVideos)
        })
      }, 1 * 60 * 1000)
    })
    .catch(console.error)
}

export default notifier
