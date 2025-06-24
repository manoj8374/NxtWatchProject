import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from './index'
import { BrowserRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

jest.mock('../../stores', () => ({
  useStores: () => ({
    themeStore: {
      theme: 'Dark',
      toggleTheme: jest.fn(),
    },
  }),
}))

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('Login Component', () => {
  beforeEach(() => {
    Cookies.remove('jwt_token')
  })

  it('should navigate to home page if user is already logged in', async () => {
    Cookies.set('jwt_token', 'test-token')
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('renders login form fields', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('USERNAME')).toBeInTheDocument()
    expect(screen.getByText('PASSWORD')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('updates username and password inputs', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const usernameInput = screen.getByPlaceholderText(/username/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)

    fireEvent.change(usernameInput, { target: { value: 'john' } })
    fireEvent.change(passwordInput, { target: { value: '12345' } })

    expect(usernameInput).toHaveValue('john')
    expect(passwordInput).toHaveValue('12345')
  })

  it('toggles password visibility when checkbox is clicked', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const passwordInput = screen.getByPlaceholderText(/password/i)
    const checkbox = screen.getByRole('checkbox')

    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(checkbox)

    expect(passwordInput).toHaveAttribute('type', 'text')
  })

  it('submits form and handles success', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ jwt_token: 'test-token' }),
    } as Response)

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'admin123' },
    })

    fireEvent.click(screen.getByTestId('loginButton'))

    await waitFor(() => {
      expect(Cookies.get('jwt_token')).toBe('test-token')
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })

    ;(global.fetch as jest.Mock).mockRestore()
  })

  it('shows error message on failed login', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error_msg: 'Invalid credentials' }),
    } as Response)

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'wrong' },
    })

    fireEvent.click(screen.getByTestId('loginButton'))

    await waitFor(() => {
      expect(screen.getByText('*Invalid credentials')).toBeInTheDocument()
    })

    ;(global.fetch as jest.Mock).mockRestore()
  })
})

describe('Dark Mode', () => {
  test('should apply dark theme class to login container', () => {
    render(
      <BrowserRouter>
          <Login />
      </BrowserRouter>
    );
    // The container should have the darkLoginPage class
    const container = screen.getByText('USERNAME').closest('.loginContainer');
    expect(container).toHaveClass('darkLoginPage');
  });

  test('should use dark theme logo', () => {
    render(
      <BrowserRouter>
          <Login />
      </BrowserRouter>
    );
    // The logo should be the dark theme logo
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute(
      'src',
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    );
  });

  test('should apply darkLabel class to labels', () => {
    render(
      <BrowserRouter>
          <Login />
      </BrowserRouter>
    );
    // All labels should have the darkLabel class
    const labels = screen.getAllByText(/USERNAME|PASSWORD/);
    labels.forEach(label => {
      expect(label).toHaveClass('darkLabel');
    });
  });
});
