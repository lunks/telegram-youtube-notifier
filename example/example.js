const telegramYoutubeNotifier = require('../build/index').default

// Setup your Telegram Bot token
const telegramToken = process.env.TELEGRAM_NOTIFIER_TOKEN

// Comma-separated list of chat ids
const telegramChatIds = process.env.TELEGRAM_CHAT_BOT_IDS

// Youtube Channel ID you want to be notified of
const youtubeChannelId = 'UCk5BcU1rOy6hepflk7_q_Pw'

// Message you want the bot to use before the link i.e.
// New video! https://www.youtube.com/watch?v=gvsQ09wM-bU
const message = 'Vídeo no ar!'

telegramYoutubeNotifier({
  telegramToken,
  telegramChatIds,
  youtubeChannelId,
  message,
})
