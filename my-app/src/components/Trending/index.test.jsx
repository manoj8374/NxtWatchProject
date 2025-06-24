import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Trending from './index'

const mockFetchTrendingVideos = jest.fn()

const mockTrendingData = [
  {
    id: 'ad9822d2-5763-41d9-adaf-baf9da3fd490',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-hubs-img.png',
    title: 'iB Hubs Announcement Event',
    viewCount: '26K',
    publishedAt: 'Nov 29, 2016',
    profileImageUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-hubs-profile-img.png',
    channelName: 'iB Hubs',
  },
]

let mockUseStores: any

jest.mock('../../stores', () => ({
  useStores: () => mockUseStores(),
}))

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Trending />
    </BrowserRouter>
  )

describe('Trending Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseStores = () => ({
      themeStore: { theme: 'Light' },
      trendingStore: {
        fetchTrendingVideos: mockFetchTrendingVideos,
        data: mockTrendingData,
        isLoading: false,
        errorView: false,
        trendingCount: 1,
      },
    })
  })

  it('renders the trending heading and card correctly', async () => {
    renderComponent()

    expect(await screen.findByTestId('trendingHeading')).toBeInTheDocument()
    expect(await screen.findByTestId('trendingCard')).toBeInTheDocument()
  })

  it('calls fetchTrendingVideos on mount', () => {
    renderComponent()
    expect(mockFetchTrendingVideos).toHaveBeenCalled()
  })
})

describe('Trending - Loading State', () => {
  beforeEach(() => {
    mockUseStores = () => ({
      themeStore: { theme: 'Light' },
      trendingStore: {
        fetchTrendingVideos: jest.fn(),
        data: [],
        isLoading: true,
        errorView: false,
        trendingCount: 0,
      },
    })
  })

  it('shows spinner when loading', () => {
    renderComponent()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})

describe('Trending - Error State', () => {
  beforeEach(() => {
    mockUseStores = () => ({
      themeStore: { theme: 'Light' },
      trendingStore: {
        fetchTrendingVideos: jest.fn(),
        data: [],
        isLoading: false,
        errorView: true,
        trendingCount: 0,
      },
    })
  })

  it('shows error view when errorView is true', () => {
    renderComponent()
    expect(screen.getByTestId('failureScreen')).toBeInTheDocument()
  })
})

describe('Trending - Dark Theme', () => {
  beforeEach(() => {
    mockUseStores = () => ({
      themeStore: { theme: 'Dark' },
      trendingStore: {
        fetchTrendingVideos: jest.fn(),
        data: [],
        isLoading: false,
        errorView: false,
        trendingCount: 0,
      },
    })
  })

  it('applies dark theme to main container', () => {
    renderComponent()
    expect(screen.getByTestId('trendingMainPageContainer')).toHaveClass('darkThemeTrendingPage')
  })
})
