import { Email, Lock, AccountCircle } from '@styled-icons/material-outlined'
import React, { useState } from 'react'
import Link from 'next/link'
import TextField from '../TextField'
import Button from '../Button'
import { FormWrapper, FormLink, FormLoading } from 'components/Form'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { useMutation } from '@apollo/client'
import { MUTATION_REGISTER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/client'

const FormSignUp = () => {
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  })

  const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) => console.error(err),
    onCompleted: () => {
      !error &&
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/'
        })
    }
  })

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

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign Up</span>}
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
