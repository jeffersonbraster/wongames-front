import { render, screen } from '@testing-library/react'
import DropDown from '.'

describe('<DropDown />', () => {
  it('should render the heading', () => {
    const { container } = render(<DropDown />)

    expect(
      screen.getByRole('heading', { name: /DropDown/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
