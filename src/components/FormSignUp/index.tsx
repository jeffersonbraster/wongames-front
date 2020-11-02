import { Email, Lock, AccountCircle } from '@styled-icons/material-outlined'
import React from 'react'
import Link from 'next/link'
import TextField from '../TextField'
import Button from '../Button'
import * as S from './styles'

const FormSignUp = () => (
  <S.Wrapper>
    <form>
      <TextField
        name="name"
        placeholder="Nome"
        type="text"
        icon={<AccountCircle />}
      />

      <TextField
        name="email"
        placeholder="E-mail"
        type="email"
        icon={<Email />}
      />

      <TextField
        name="password"
        placeholder="Senha"
        type="password"
        icon={<Lock />}
      />

      <TextField
        name="confirm-password"
        placeholder="Confirme a senha"
        type="password"
        icon={<Lock />}
      />

      <Button size="large" fullWidth>
        Sign Up
      </Button>

      <S.FormLink>
        Already have an account?
        <Link href="/sign-up">
          <a>Sing in</a>
        </Link>
      </S.FormLink>
    </form>
  </S.Wrapper>
)

export default FormSignUp
