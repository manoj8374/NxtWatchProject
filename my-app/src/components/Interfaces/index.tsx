export interface Video {
    id: string;
    published_at: string;
    thumbnail_url: string;
    title: string;
    view_count: string;
    channel: {
      name: string;
      profile_image_url: string;
    };
}

export interface VideoDetails{
  id: string
  thumbnail_url: string
  title: string
  view_count: string
}

export interface VideoItemInterface{
  description: string
  id: string
  publishedAt: string
  thumbnailUrl: string
  title: string
  videoUrl: string
  viewCount: string
  channelName: string
  profileImageUrl: string
  subscriberCount: string
  ageOfTheVideo: number
}

export interface ParamsInterface {
  id: string;
}

export interface VideoContextInterface {
  id: string
  title: string
  channelName: string
  description: string
  publishedAt: string
  thumbnailUrl: string
  videoUrl: string
  ageOfTheVideo: number
  profileImageUrl: string
  viewCount: string
  subscriberCount: string
}

export interface ThemeContextInterface {
  theme: string
  toggleTheme: () => void
  saveTheVideo: (videoDetails: VideoContextInterface) => void
  savedVideos: VideoContextInterface[]
  AddToLikeVideo: (id: string) => void
  likedVideos: string[]
  AddToDislikeVideo: (id: string) => void
  dislikedVideos: string[],
}


export interface ThemeContextProps{
  children: React.ReactNode
}