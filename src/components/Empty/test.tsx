import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Empty from '.'

const props = {
  title: 'a simple title',
  description: 'a simple description',
  hasLink: true
}

describe('<Empty />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Empty {...props} hasLink />)

    expect(
      screen.getByRole('image', { name: /a gamer in a couch playing a game/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /a simple title/i })
    ).toBeInTheDocument()

    expect(screen.getByText(/a simple description/i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /go back store/i })
    ).toHaveAttribute('href', '/')
  })

  it('Should not render link when hasLink = false', () => {
    renderWithTheme(<Empty {...props} />)

    expect(
      screen.queryByRole('link', { name: /go back store/i })
    ).not.toBeInTheDocument()
  })
})
