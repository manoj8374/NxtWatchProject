import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import HomeContents from './index'
import { BrowserRouter } from 'react-router-dom'

const mockFetchVideos = jest.fn()

let mockUseStores: any

jest.mock('../../stores', () => ({
  useStores: () => mockUseStores(),
}))

const renderComponent = () =>
  render(
    <BrowserRouter>
      <HomeContents />
    </BrowserRouter>
  )

describe('HomeContents Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockUseStores = () => ({
      themeStore: {
        theme: 'Light',
      },
      homeStore: {
        fetchVideos: mockFetchVideos,
        data: [
          {
            channelName: 'iB Cricket',
            id: '30b642bd-7591-49f4-ac30-5c538f975b15',
            profileImageUrl:
              'https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-cricket-profile-img.png',
            publishedAt: 'Apr 19, 2019',
            thumbnailUrl:
              'https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-cricket-img.png',
            title: 'Sehwag shares his batting experience in iB Cricket | iB Cricket',
            viewCount: '1.4K',
          },
        ],
        errorView: false,
        isLoading: false,
      },
    })
  })

  it('renders the search input and banner initially', () => {
    renderComponent()
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    expect(screen.getByTestId('banner')).toBeInTheDocument()
  })

  it('hides the banner when cancel button is clicked', () => {
    renderComponent()
    const cancelBtn = screen.getByTestId('cancelBannerButton')
    fireEvent.click(cancelBtn)
    expect(
      screen.queryByText('Buy Nxt Watch Premium prepaid plans with UPI')
    ).not.toBeInTheDocument()
  })

  it('calls fetchVideos on search input change', async () => {
    renderComponent()
    const input = screen.getByPlaceholderText(/search/i)
    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      expect(mockFetchVideos).toHaveBeenCalledWith('test')
    })
  })

  it('renders video cards with correct data', () => {
    renderComponent()
    expect(screen.getByTestId('homeVideoCard')).toBeInTheDocument()
    expect(
      screen.getByText('Sehwag shares his batting experience in iB Cricket | iB Cricket')
    ).toBeInTheDocument()
    expect(screen.getByText('iB Cricket')).toBeInTheDocument()
    expect(screen.getByText('1.4K views')).toBeInTheDocument()
  })

  it('shows the correct published years ago', () => {
    renderComponent()
    const today = new Date()
    const publishedDate = new Date('2019-04-19')
    const expectedYearsAgo = today.getFullYear() - publishedDate.getFullYear()
    expect(screen.getByText(`${expectedYearsAgo} years ago`)).toBeInTheDocument()
  })
})

describe('Loading state', () => {
  beforeEach(() => {
    mockUseStores = () => ({
      themeStore: { theme: 'Light' },
      homeStore: {
        fetchVideos: jest.fn(),
        data: [],
        errorView: false,
        isLoading: true,
      },
    })
  })

  it('shows spinner when loading', () => {
    renderComponent()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})


describe("Failure Testing",()=>{
    beforeEach(() => {
        mockUseStores = () => ({
            themeStore: { theme: 'Light' },
            homeStore: {
                fetchVideos: mockFetchVideos,
                data: [],
                errorView: true,
                isLoading: false,
            },
        })
    })

    it('shows failure screen when errorView is true', () => {
        renderComponent()
        expect(screen.getByTestId('failureScreen')).toBeInTheDocument()
    })
})

describe("No Videos Testing",()=>{
    beforeEach(() => {
        mockUseStores = () => ({
            themeStore: { theme: 'Light' },
            homeStore: {
                fetchVideos: mockFetchVideos,
                data: [],
                errorView: false,
                isLoading: false,
            },
        })
    })

    it('shows no videos screen when data is empty', () => {
        renderComponent()
        expect(screen.getByTestId('noVideosScreen')).toBeInTheDocument()
        expect(screen.getByText('Retry')).toBeInTheDocument()

        const retryButton = screen.getByText('Retry')
        fireEvent.click(retryButton)
        expect(mockFetchVideos).toHaveBeenCalledWith('')
    })
})  


//testing for dark theme

describe('Dark Theme Testing', () => {
    beforeEach(() => {
      mockUseStores = () => ({
        themeStore: { theme: 'Dark' },
        homeStore: {
          fetchVideos: mockFetchVideos,
          data: [],
          errorView: false,
          isLoading: false,
        },
      })
    })
  
    it('applies dark theme classes correctly', () => {
      renderComponent()
  
      expect(
        screen.getByTestId('homeContentsContainer')
      ).toHaveClass('darkBackgroundHomeVideoItem')

      const input = screen.getByPlaceholderText('Search')
      expect(input).toHaveClass('darkInputHome')
    })
  
    it('renders no videos screen with dark heading class', () => {
      renderComponent()
  
      const heading = screen.getByText('No search Results Found')
      expect(heading).toHaveClass('darkThemeHeadingFailure')
    })
  })
  
