import {
  forgotValidate,
  resetValidate,
  signInValidation,
  signUpValidation
} from '.'

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
      expect(signInValidation(values)).toMatchInlineSnapshot(`
        Object {
          "email": "\\"email\\" must be a valid email",
        }
      `)
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

      expect(signUpValidation(values).username).toMatchInlineSnapshot(
        `"\\"username\\" length must be at least 5 characters long"`
      )
    })

    it('should return invalid email error', () => {
      const values = {
        username: 'jefferson',
        email: 'invalid-email',
        password: '123456'
      }

      expect(signUpValidation(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })

    it('should return error if password does not match with confirm_password', () => {
      const values = {
        username: 'jefferson',
        email: 'jeje@gmail.com',
        password: '123456',
        confirm_password: '12345'
      }

      expect(signUpValidation(values).confirm_password).toMatchInlineSnapshot(
        `"Suas senhas não conferem."`
      )
    })
  })

  describe('forgotValidate()', () => {
    it('should validade empty fields', () => {
      const values = { email: '' }

      expect(forgotValidate(values)).toMatchObject({
        email: expect.any(String)
      })
    })

    it('shoud return invalid email error', () => {
      const values = { email: 'invalid-email' }
      expect(forgotValidate(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })
  })

  describe('resetValidate()', () => {
    it('should validade empty fields', () => {
      const values = { password: '', confirm_password: '' }

      expect(resetValidate(values)).toMatchObject({
        password: expect.any(String)
      })
    })

    it('should validade confirm password', () => {
      const values = { password: '1234', confirm_password: '1234' }

      expect(resetValidate(values).confirm_password).toMatchInlineSnapshot(
        `undefined`
      )
    })
  })
})
