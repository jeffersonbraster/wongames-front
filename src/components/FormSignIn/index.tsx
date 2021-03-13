import { Email, Lock } from '@styled-icons/material-outlined'
import React, { useState } from 'react'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
import TextField from '../TextField'
import { FormWrapper, FormLink } from 'components/Form'
import Button from '../Button'
import * as S from './styles'
import { useRouter } from 'next/router'

const FormSignIn = () => {
  const [values, setValues] = useState({})
  const { push } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    })

    if (result?.url) {
      return push(result?.url)
    }

    //catenha dado algum erro
    console.error('email ou senha errado')
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="E-mail"
          onInputChange={(v) => handleInput('email', v)}
          type="email"
          icon={<Email />}
        />

        <TextField
          name="password"
          placeholder="Password"
          onInputChange={(v) => handleInput('password', v)}
          type="password"
          icon={<Lock />}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" fullWidth>
          Sign In
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
