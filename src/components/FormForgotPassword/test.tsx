import userEvent from '@testing-library/user-event'
import 'server.mock'
import { render, screen } from 'utils/test-utils'

import FormForgotPassword from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
let query = {}

useRouter.mockImplementation(() => ({
  query
}))

describe('<FormForgotPassword />', () => {
  it('should render the form', () => {
    render(<FormForgotPassword />)

    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Send e-mail/i })
    ).toBeInTheDocument()
  })

  it('should validate the email', async () => {
    render(<FormForgotPassword />)

    await userEvent.type(
      screen.getByPlaceholderText(/E-mail/i),
      'valid@email.com'
    )

    userEvent.click(screen.getByRole('button', { name: /Send e-mail/i }))

    expect(
      await screen.findByText('You just received an E-mail')
    ).toBeInTheDocument()
  })

  it('should show invalidate email', async () => {
    render(<FormForgotPassword />)

    await userEvent.type(screen.getByPlaceholderText(/E-mail/i), 'invalid')

    userEvent.click(screen.getByRole('button', { name: /Send e-mail/i }))

    expect(
      await screen.findByText(/"email" must be a valid email/i)
    ).toBeInTheDocument()
  })

  it('should show an inexistent email error', async () => {
    render(<FormForgotPassword />)

    await userEvent.type(
      screen.getByPlaceholderText(/E-mail/i),
      'false@email.com'
    )

    userEvent.click(screen.getByRole('button', { name: /Send e-mail/i }))

    expect(
      await screen.findByText(/this email does not exist/i)
    ).toBeInTheDocument()
  })

  it('should autofill if comer via logged user', async () => {
    query = { email: 'valid@email.com' }

    render(<FormForgotPassword />)

    expect(screen.getByPlaceholderText(/E-mail/i)).toHaveValue(
      'valid@email.com'
    )
  })
})
