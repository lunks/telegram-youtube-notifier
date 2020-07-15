declare module 'davefeedread' {
  import FeedParser from 'feedparser'
  interface Feed {
    head: FeedParser.Meta
    items: FeedParser.Item[]
  }

  interface FeedUrlCallback {
    (err: Error, feed: Feed): void
  }
  export function parseUrl(feedUrl: string, timeOutSecs: number, callback: FeedUrlCallback): void
}
