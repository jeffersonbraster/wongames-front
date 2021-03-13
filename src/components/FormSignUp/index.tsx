import { Email, Lock, AccountCircle } from '@styled-icons/material-outlined'
import React, { useState } from 'react'
import Link from 'next/link'
import TextField from '../TextField'
import Button from '../Button'
import { FormWrapper, FormLink } from 'components/Form'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { useMutation } from '@apollo/client'
import { MUTATION_REGISTER } from 'graphql/mutations/register'

const FormSignUp = () => {
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  })

  const [createUser] = useMutation(MUTATION_REGISTER)

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password
        }
      }
    })
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="Username"
          onInputChange={(v) => handleInput('username', v)}
          type="text"
          icon={<AccountCircle />}
        />

        <TextField
          name="email"
          placeholder="E-mail"
          onInputChange={(v) => handleInput('email', v)}
          type="email"
          icon={<Email />}
        />

        <TextField
          name="password"
          placeholder="Senha"
          onInputChange={(v) => handleInput('password', v)}
          type="password"
          icon={<Lock />}
        />

        <TextField
          name="confirm-password"
          placeholder="Confirme a senha"
          onInputChange={(v) => handleInput('confirm-password', v)}
          type="password"
          icon={<Lock />}
        />

        <Button type="submit" size="large" fullWidth>
          Sign Up
        </Button>

        <FormLink>
          Already have an account?
          <Link href="/sign-in">
            <a>Sing in</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp
