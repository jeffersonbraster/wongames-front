import { Email, Lock, ErrorOutline } from '@styled-icons/material-outlined'
import React, { useState } from 'react'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
import TextField from '../TextField'
import { FormWrapper, FormLink, FormLoading, FormError } from 'components/Form'
import Button from '../Button'
import * as S from './styles'
import { useRouter } from 'next/router'
import { FieldErrors, signInValidation } from 'utils/validations'

const FormSignIn = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = signInValidation(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    })

    if (result?.url) {
      return push(result?.url)
    }

    setLoading(false)

    //catenha dado algum erro
    setFormError('username or password is invalid.')
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="E-mail"
          error={fieldError?.email}
          onInputChange={(v) => handleInput('email', v)}
          type="email"
          icon={<Email />}
        />

        <TextField
          name="password"
          placeholder="Password"
          error={fieldError?.password}
          onInputChange={(v) => handleInput('password', v)}
          type="password"
          icon={<Lock />}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign In</span>}
        </Button>

        <FormLink>
          Don't have an account?
          <Link href="/sign-up">
            <a>Sing Up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
