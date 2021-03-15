import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'
import UserDropDown from '.'

describe('<UserDropDown />', () => {
  it('should render the username', () => {
    renderWithTheme(<UserDropDown username="jeje" />)

    expect(screen.getByText(/jeje/i)).toBeInTheDocument()
  })

  it('should render the menu', () => {
    renderWithTheme(<UserDropDown username="jeje" />)

    // open menu
    userEvent.click(screen.getByText(/jeje/i))

    expect(
      screen.getByRole('link', { name: /my profile/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /wishlist/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /sign out/i })
    ).toBeInTheDocument()
  })
})
