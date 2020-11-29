import { render, screen } from '@testing-library/react'
import Cart from '.'

describe('<Cart />', () => {
  it('should render the heading', () => {
    render(<Cart />)
  })
})
