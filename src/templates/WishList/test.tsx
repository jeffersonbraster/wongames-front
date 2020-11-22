import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import Wishlist from '.'

const props = {
  games: gamesMock,
  recommendedHighlight: highlightMock,
  recommendedGames: gamesMock
}

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />
  }
}))

describe('<WishList />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Wishlist {...props} />)

    expect(
      screen.getByRole('heading', { name: /wishlist/i })
    ).toBeInTheDocument()

    expect(screen.getAllByText(/populate zero/i)).toHaveLength(6)

    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
  })
})
