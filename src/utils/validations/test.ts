import GameDetails from 'components/GameDetails'
import { signInValidation, signUpValidation } from '.'

describe('validations', () => {
  describe('signInValidade()', () => {
    it('should validade empty fields', () => {
      const values = { email: '', password: '' }

      expect(signInValidation(values)).toMatchObject({
        email: expect.any(String),
        password: expect.any(String)
      })
    })

    it('shoud return invalid email error', () => {
      const values = { email: 'invalid-email', password: '1234' }
      expect(signInValidation(values)).toMatchInlineSnapshot()
    })
  })

  describe('signUpValidade()', () => {
    it('should validade empty fields', () => {
      const values = { username: '', email: '', password: '' }

      expect(signUpValidation(values)).toMatchObject({
        email: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        confirm_password: expect.any(String)
      })
    })

    it('should return short username error', () => {
      const values = { username: 'test', email: '', password: '' }

      expect(signUpValidation(values).username).toMatchInlineSnapshot()
    })

    it('should return invalid email error', () => {
      const values = {
        username: 'jefferson',
        email: 'invalid-email',
        password: '123456'
      }

      expect(signUpValidation(values).email).toMatchInlineSnapshot()
    })

    it('should return error if password does not match with confirm_password', () => {
      const values = {
        username: 'jefferson',
        email: 'jeje@gmail.com',
        password: '123456',
        confirm_password: '12345'
      }

      expect(signUpValidation(values).confirm_password).toMatchInlineSnapshot()
    })
  })
})
