import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TrendingCard from './index'

const mockUseStores = jest.fn()

jest.mock('../../stores', () => ({
  useStores: () => mockUseStores(),
}))

const mockDetails = {
  id: 'ad9822d2-5763-41d9-adaf-baf9da3fd490',
  thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-hubs-img.png',
  title: 'iB Hubs Announcement Event',
  viewCount: '26K',
  publishedAt: 'Nov 29, 2016',
  profileImageUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-hubs-profile-img.png',
  channelName: 'iB Hubs',
}

const renderComponent = () =>
  render(
    <BrowserRouter>
      <TrendingCard details={mockDetails} />
    </BrowserRouter>
  )

describe('TrendingCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseStores.mockReturnValue({
      themeStore: { theme: 'Light' },
    })
  })

  it('renders title, channel name, and view count', () => {
    renderComponent()

    expect(screen.getByTestId('trendingCard')).toBeInTheDocument()
    expect(screen.getByText('iB Hubs Announcement Event')).toBeInTheDocument()
    expect(screen.getByText('iB Hubs')).toBeInTheDocument()
    expect(screen.getByText(/26K/)).toBeInTheDocument()
    expect(screen.getByText(/years ago/)).toBeInTheDocument()
  })

  it('applies light theme class when theme is Light', () => {
    renderComponent()
    expect(screen.getByText('iB Hubs Announcement Event')).toHaveClass('trendingPageLightThemeHeading')
  })

  it('applies dark theme class when theme is Dark', () => {
    mockUseStores.mockReturnValue({
      themeStore: { theme: 'Dark' },
    })
    renderComponent()
    expect(screen.getByText('iB Hubs Announcement Event')).toHaveClass('trendingPageDarkThemeHeading')
  })

  it('links to correct video URL', () => {
    renderComponent()
    const link = screen.getByTestId('trendingCard')
    expect(link.getAttribute('href')).toBe(`/videos/${mockDetails.id}`)
  })
})
