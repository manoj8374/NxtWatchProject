import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './index'

jest.mock('../Header', () => () => <div data-testid="header">Header</div>)
jest.mock('../SideBar', () => () => <div data-testid="sidebar">SideBar</div>)
jest.mock('../HomeContents', () => () => <div data-testid="home-contents">HomeContents</div>)

describe('Home Component', () => {
  test('should render all child components', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('home-contents')).toBeInTheDocument()
  })
}) 