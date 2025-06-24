import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import VideoItem from './index'

jest.mock('react-player', () => () => <div data-testid="mock-react-player" />)

const mockFetchVideoItem = jest.fn()
const mockSaveVideo = jest.fn()
const mockAddToLiked = jest.fn()
const mockAddToDisliked = jest.fn()
const mockIsLiked = jest.fn()
const mockIsDisliked = jest.fn()
const mockIsSaved = jest.fn()

const mockVideoData = {
  id: 'ad9822d2-5763-41d9-adaf-baf9da3fd490',
  title: 'iB Hubs Announcement Event',
  description: 'iB Hubs grandly celebrated its Announcement Event in November...',
  publishedAt: 'Nov 29, 2016',
  thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/ibhubs-img.png',
  videoUrl: 'https://www.youtube.com/watch?v=pT2ojWWjum8',
  viewCount: '26K',
  channelName: 'iB Hubs',
  profileImageUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/ibhubs-profile-img.png',
  subscriberCount: '1M',
  ageOfTheVideo: 8,
}

let mockUseStores: any
jest.mock('../../stores', () => ({
  useStores: () => mockUseStores(),
}))

const createMockStores = ({
  theme = 'Light',
  data = mockVideoData,
  loading = false,
  errorView = false,
}) => ({
  videoItemStore: {
    data,
    loading,
    errorView,
    fetchVideoItem: mockFetchVideoItem,
  },
  savedVideosStore: {
    saveVideo: mockSaveVideo,
    isVideoSaved: mockIsSaved.mockReturnValue(false),
  },
  userPreferencesStore: {
    addToLikedVideos: mockAddToLiked,
    addToDislikedVideos: mockAddToDisliked,
    isVideoLiked: mockIsLiked.mockReturnValue(false),
    isVideoDisliked: mockIsDisliked.mockReturnValue(false),
  },
  themeStore: {
    theme,
  },
})

const renderComponent = (videoId: string) => {
  window.history.pushState({}, 'Test page', `/videos/${videoId}`)
  return render(
    <MemoryRouter initialEntries={[`/videos/${videoId}`]}>
      <Routes>
        <Route path="/videos/:id" element={<VideoItem />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('VideoItem Component', () => {
  beforeEach(() => {
    mockUseStores = () => createMockStores({})
  })

  it('renders video data correctly', async () => {
    renderComponent(mockVideoData.id)
    expect(await screen.findByText('iB Hubs Announcement Event')).toBeInTheDocument()
    expect(screen.getByText('26K views')).toBeInTheDocument()
    expect(screen.getByText('8 years ago')).toBeInTheDocument()
  })

  it('calls fetchVideoItem on mount', () => {
    renderComponent(mockVideoData.id)
    expect(mockFetchVideoItem).toHaveBeenCalledWith(mockVideoData.id)
  })

  it('handles like/dislike/save clicks', () => {
    renderComponent(mockVideoData.id)
    screen.getByText('Like').click()
    screen.getByText('Dislike').click()
    screen.getByText('Save').click()

    expect(mockAddToLiked).toHaveBeenCalledWith(mockVideoData.id)
    expect(mockAddToDisliked).toHaveBeenCalledWith(mockVideoData.id)
    expect(mockSaveVideo).toHaveBeenCalledWith(mockVideoData)
  })

  it("should show 'Saved' after saving the video", async () => {
    mockIsSaved.mockReturnValueOnce(false).mockReturnValue(true);
    renderComponent(mockVideoData.id);

    const saveButton = await screen.findByText('Save');
    expect(saveButton).toBeInTheDocument()
    saveButton.click();

    expect(mockSaveVideo).toHaveBeenCalledWith(mockVideoData)
  });
});

describe('Dark Theme Testing', () => {
  beforeEach(() => {
    mockUseStores = () => createMockStores({ theme: 'Dark' })
  })

  it('applies dark theme class', async () => {
    renderComponent(mockVideoData.id)
    const container = await screen.findByTestId('videoItemContainer')
    expect(container).toHaveClass('videoItemDarkTheme')
  })
})

describe('Failure View Testing', () => {
  beforeEach(() => {
    mockUseStores = () => createMockStores({ data: undefined, errorView: true })
  })

  it('renders failure view', async () => {
    renderComponent(mockVideoData.id)
    expect(await screen.findByTestId('failureScreen')).toBeInTheDocument()
  })
})

describe('Loading View Testing', () => {
  beforeEach(() => {
    mockUseStores = () => createMockStores({ data: undefined, loading: true })
  })

  it('renders loading spinner', async () => {
    renderComponent(mockVideoData.id)
    expect(await screen.findByTestId('spinner')).toBeInTheDocument()
  })
})
