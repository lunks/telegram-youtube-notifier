import { parseUrl as parseFeed } from 'davefeedread'
import * as FeedParser from 'feedparser'

export interface Video {
  url: string
}

const checkIfNewVideo = (oldVideos: Video[]) => (newVideo: Video) =>
  !oldVideos.some((video) => newVideo.url === video.url)

const feedItemToVideo = (item: FeedParser.Item): Video => ({ url: item.link })

export const fetchVideosFromFeed = (feedUrl: string): Promise<Video[]> => {
  return new Promise((resolve, reject) => {
    return parseFeed(feedUrl, 30, (err, { items }) => {
      if (err) {
        reject(err)
      }
      resolve(items.map(feedItemToVideo))
    })
  })
}

export const processNewVideos = (
  postNewVideo: (video: Video) => void,
  videosFromFeed: Video[],
  videosFromCache: Video[],
): Promise<Video[]> => {
  return new Promise((resolve) => {
    const newVideos = videosFromFeed.filter(checkIfNewVideo(videosFromCache))
    if (newVideos.length > 0) {
      console.log(`${newVideos.length} new video(s) found!`)
      newVideos.map(postNewVideo)
    }
    resolve(videosFromFeed)
  })
}
