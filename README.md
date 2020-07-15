# Telegram Youtube Notifier
A simple, memory-based cache that notifies Telegram groups when a new
youtube video has been posted to a channel.

## Usage

```javascript
const telegramYoutubeNotifer = require('telegram-youtube-notifier').default

// Setup your Telegram Bot token
const telegramToken = token

// Comma-separated list of chat ids
const telegramChatIds = "chatId1,chatId2" 

// Youtube Channel ID you want to be notified of
const youtubeChannelId = "UCk5BcU1rOy6hepflk7_q_Pw"


// Message you want the bot to use before the link i.e.
// New video! https://www.youtube.com/watch?v=gvsQ09wM-bU
const message = "New Video!"

telegramYoutubeNotifer({
  telegramToken,
  telegramChatIds,
  youtubeChannelId,
  message
})
```
