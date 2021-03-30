import { Lock, ErrorOutline } from '@styled-icons/material-outlined'
import React, { useState } from 'react'
import { signIn } from 'next-auth/client'
import TextField from '../TextField'
import { FormWrapper, FormLoading, FormError } from 'components/Form'
import Button from '../Button'
import { useRouter } from 'next/router'
import { FieldErrors } from 'utils/validations'

const FormResetPassword = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const routes = useRouter()
  const { push, query } = routes

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = {} //validate

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
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
          {loading ? <FormLoading /> : <span>Reset password</span>}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormResetPassword
