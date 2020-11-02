import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/tests/helpers'
import FormSignUp from '.'

describe('<FormSignUp />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(<FormSignUp />)

    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirme a senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    expect(container.parentElement).toMatchSnapshot()
  })

  it('should render text to sign up if already have an account', () => {
    renderWithTheme(<FormSignUp />)

    expect(screen.getByRole('link', { name: /Sing in/i })).toBeInTheDocument()
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument()
  })
})
