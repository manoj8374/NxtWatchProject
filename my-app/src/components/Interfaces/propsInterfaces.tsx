export interface GamingCardDetails {
    id: string
    thumbnailUrl: string
    title: string
    viewCount: string
}

export interface GamingCardItemInterface {
    details: GamingCardDetails
}

export interface HomeVideoCardDetails{
    id: string;
    publishedAt: string;
    thumbnailUrl: string;
    title: string;
    viewCount: string;
    channelName: string,
    profileImageUrl: string;
}

export interface HomeVideoCardInterface{
    details: HomeVideoCardDetails,
}

export interface SavedVideoCardDetails{
    id: string;
    thumbnailUrl: string;
    title: string;
    viewCount: string;
    channelName: string,
    ageOfTheVideo: number
}

export interface SavedVideoItemInterface{
    details: SavedVideoCardDetails
}