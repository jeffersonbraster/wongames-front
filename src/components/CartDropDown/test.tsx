import { render, screen } from 'utils/test-utils'
import CartDropDown from '.'

import items from 'components/CartList/mock'
import { CartContextDefaultValues } from 'hooks/use-cart'

describe('<CartDropDown />', () => {
  beforeEach(() => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      quantity: items.length,
      total: 'R$ 300'
    }

    render(<CartDropDown />, { cartProviderProps })
  })
  it('should render <CartIcon /> and its badge', () => {
    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${items.length}`)).toBeInTheDocument()
  })

  it('should render dropdown content with cart items and total', () => {
    expect(screen.getByText('R$ 300')).toBeInTheDocument()
    expect(screen.getByText(`${items[0].title}`)).toBeInTheDocument()
  })
})
