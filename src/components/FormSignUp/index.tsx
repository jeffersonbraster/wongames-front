import {
  Email,
  Lock,
  AccountCircle,
  ErrorOutline
} from '@styled-icons/material-outlined'
import React, { useState } from 'react'
import Link from 'next/link'
import TextField from '../TextField'
import Button from '../Button'
import { FormWrapper, FormLink, FormLoading, FormError } from 'components/Form'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { useMutation } from '@apollo/client'
import { MUTATION_REGISTER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/client'
import { FieldErrors, signUpValidation } from 'utils/validations'

const FormSignUp = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  })

  const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) =>
      setFormError(
        err?.graphQLErrors[0]?.extensions?.exception.data.message[0].messages[0]
          .message
      ),
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

    setFormError('')

    const errors = signUpValidation(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    setFieldError({})

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
        {!!formError && (
          <FormError>
            <ErrorOutline /> {formError}
          </FormError>
        )}
        <TextField
          name="username"
          placeholder="Username"
          onInputChange={(v) => handleInput('username', v)}
          error={fieldError?.username}
          type="text"
          icon={<AccountCircle />}
        />

        <TextField
          name="email"
          placeholder="E-mail"
          onInputChange={(v) => handleInput('email', v)}
          error={fieldError?.email}
          type="email"
          icon={<Email />}
        />

        <TextField
          name="password"
          placeholder="Senha"
          onInputChange={(v) => handleInput('password', v)}
          error={fieldError?.password}
          type="password"
          icon={<Lock />}
        />

        <TextField
          name="confirm_password"
          placeholder="Confirme a senha"
          onInputChange={(v) => handleInput('confirm_password', v)}
          error={fieldError?.confirm_password}
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
