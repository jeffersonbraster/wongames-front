import { render, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import CartDropDown from '.'

import items from 'components/CartList/mock'

describe('<CartDropDown />', () => {
  it('should render <CartIcon /> and its badge', () => {
    renderWithTheme(<CartDropDown items={items} total="R$ 300" />)

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${items.length}`)).toBeInTheDocument()
  })

  it('should render dropdown content with cart items and total', () => {
    renderWithTheme(<CartDropDown items={items} total="R$ 300" />)

    expect(screen.getByText('R$ 300')).toBeInTheDocument()
    expect(screen.getByText(`${items[0].title}`)).toBeInTheDocument()
  })
})
