import 'session.mock'
import { render, screen } from 'utils/test-utils'
import GameInfo from '.'

const props = {
  id: '1',
  title: 'My Game Title',
  description: 'Game Description',
  price: 210
}

describe('<GameInfo />', () => {
  it('should render game information', () => {
    const { container } = render(<GameInfo {...props} />)

    //esperar um heading (title)
    expect(
      screen.getByRole('heading', { name: /my game title/i })
    ).toBeInTheDocument()

    //esperar pelo description
    expect(screen.getByText(/\$210/i)).toBeInTheDocument()

    //esperar pelo price
    expect(screen.getByText(/game description/i)).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render buttons', () => {
    render(<GameInfo {...props} />)

    //esperar um button add to cart
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument()

    //esperar por button wishlist
    expect(
      screen.getByRole('button', { name: /add to wishlist/i })
    ).toBeInTheDocument()
  })
})
