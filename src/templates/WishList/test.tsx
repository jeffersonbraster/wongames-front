import { render, screen } from '@testing-library/react'
import WishList from '.'

describe('<WishList />', () => {
  it('should render the heading', () => {
    const { container } = render(<WishList />)

    expect(
      screen.getByRole('heading', { name: /WishList/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
