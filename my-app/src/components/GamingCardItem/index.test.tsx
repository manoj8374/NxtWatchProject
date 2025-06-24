import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import GamingCardItem from './index'

const mockUseStores: any = jest.fn()

jest.mock('../../stores', () => ({
  useStores: () => mockUseStores(),
}))

const mockDetails = {
  id: 'b214dc8a-b126-4d15-8523-d37404318347',
  thumbnailUrl: 'https://assets.ccbp.in/frontend/react-js/nxt-watch/drop-stack-ball-img.png',
  title: 'Drop Stack Ball',
  viewCount: '44K',
}

const renderComponent = () =>
  render(
    <BrowserRouter>
      <GamingCardItem details={mockDetails} />
    </BrowserRouter>
  )

describe('GamingCardItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseStores.mockReturnValue({
      themeStore: { theme: 'Light' },
    })
  })

  it('renders gaming card item with title and views', () => {
    renderComponent()

    const card = screen.getByTestId('gamingCardItem')
    expect(card).toBeInTheDocument()

    expect(screen.getByText('Drop Stack Ball')).toBeInTheDocument()
    expect(screen.getByText("44K Watching Worldwide")).toBeInTheDocument()
  })

  it('applies dark theme class when theme is Dark', () => {
    mockUseStores.mockReturnValue({
      themeStore: { theme: 'Dark' },
    })

    renderComponent()
    expect(screen.getByText('Drop Stack Ball')).toHaveClass('darkThemeGameTitle')
  })
})
