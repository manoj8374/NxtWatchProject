import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Gaming from './index'
import { observer } from 'mobx-react-lite'

const mockFetchGamingVideos = jest.fn()

const mockData = [
  {
    id: 'b214dc8a-b126-4d15-8523-d37404318347',
    thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/drop-stack-ball-img.png',
    title: 'Drop Stack Ball',
    viewCount: '44K',
  },
]

let mockUseStores: any

jest.mock('../../stores', () => ({
  useStores: () => mockUseStores(),
}))

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Gaming />
    </BrowserRouter>
  )

describe('Gaming Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseStores = () => ({
      themeStore: { theme: 'Light' },
      gamingStore: {
        fetchGamingVideos: mockFetchGamingVideos,
        data: mockData,
        errorView: false,
        isLoading: false,
      },
    })
  })

  it('renders the gaming videos correctly', async () => {
    renderComponent()

    expect(screen.getByTestId('gamingHeading')).toBeInTheDocument()
    expect(screen.getByTestId('gamingCardItem')).toBeInTheDocument()
  })

})

describe('Gaming - Loading State', () => {
  beforeEach(() => {
    mockUseStores = () => ({
      themeStore: { theme: 'Light' },
      gamingStore: {
        fetchGamingVideos: jest.fn(),
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

describe('Gaming - Error State', () => {
  beforeEach(() => {
    mockUseStores = () => ({
      themeStore: { theme: 'Light' },
      gamingStore: {
        fetchGamingVideos: jest.fn(),
        data: [],
        errorView: true,
        isLoading: false,
      },
    })
  })

  it('renders failure view on error', () => {
    renderComponent()
    expect(screen.getByTestId('failureScreen')).toBeInTheDocument()
  })
})


describe('Gaming - Dark Theme', () => {
  beforeEach(() => {
    mockUseStores = () => ({
      themeStore: { theme: 'Dark' },
      gamingStore: {
        fetchGamingVideos: jest.fn(),
        data: [],
        errorView: false,
        isLoading: false,
      },
    })
  })

  it("Should render the gaming main page container with dark theme", () => {
    renderComponent()
    expect(screen.getByTestId('gamingMainPageContainer')).toHaveClass('darkContainerGaming')
  })

  
})