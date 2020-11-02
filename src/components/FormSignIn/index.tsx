import { Email, Lock } from '@styled-icons/material-outlined'
import React from 'react'
import Link from 'next/link'
import TextField from '../TextField'
import { FormWrapper, FormLink } from 'components/Form'
import Button from '../Button'
import * as S from './styles'

const FormSignIn = () => (
  <FormWrapper>
    <form>
      <TextField
        name="email"
        placeholder="E-mail"
        type="email"
        icon={<Email />}
      />

      <TextField
        name="password"
        placeholder="Password"
        type="password"
        icon={<Lock />}
      />
      <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

      <Button size="large" fullWidth>
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

export default FormSignIn
