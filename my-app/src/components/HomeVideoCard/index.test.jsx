import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomeVideoCard from './index'


//for mocking the useStores in the test cases we used factory pattern in which we can mock the useStores in the test cases
let mockUseStores = () => ({
  themeStore: { theme: 'Light' },
})

jest.mock('../../stores', () => ({
  useStores: () => mockUseStores(),
}))

const details = {
  id: '30b642bd-7591-49f4-ac30-5c538f975b15',
  title: 'Sehwag shares his batting experience in iB Cricket | iB Cricket',
  thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-cricket-img.png',
  profileImageUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-cricket-profile-img.png',
  channelName: 'iB Cricket',
  viewCount: '1.4K',
  publishedAt: 'April 19, 2019',
}

const renderComponent = () => {
  render(
    <BrowserRouter>
      <HomeVideoCard details={details} />
    </BrowserRouter>
  )
}

describe('HomeVideoCard Testing', () => {
  beforeEach(() => {
    mockUseStores = () => ({
      themeStore: { theme: 'Light' },
    })
  })

  it('renders video details', () => {
    renderComponent()
    expect(
      screen.getByText('Sehwag shares his batting experience in iB Cricket | iB Cricket')
    ).toBeInTheDocument()
    expect(screen.getByText('iB Cricket')).toBeInTheDocument()
    expect(screen.getByText('1.4K views')).toBeInTheDocument()
  })

  it('renders correct years ago', () => {
    renderComponent()
    const currentYear = new Date().getFullYear()
    const expectedYearsAgo = currentYear - 2019
    expect(screen.getByText(`${expectedYearsAgo} years ago`)).toBeInTheDocument()
  })

  it('renders thumbnail and profile image with correct src', () => {
    renderComponent()
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('src', details.thumbnailUrl)
    expect(images[1]).toHaveAttribute('src', details.profileImageUrl)
  })

  it('has correct navigation link', () => {
    renderComponent()
    const link = screen.getByTestId('homeVideoCard')
    expect(link).toHaveAttribute('href', `/videos/${details.id}`)
  })

  it('applies dark theme class when theme is Dark', () => {
    mockUseStores = () => ({
      themeStore: { theme: 'Dark' },
    })

    renderComponent()
    const title = screen.getByText(details.title)
    expect(title).toHaveClass('darkThemeColorVideoItem')
  })
})
