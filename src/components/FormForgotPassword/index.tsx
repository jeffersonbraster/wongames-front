import {
  CheckCircleOutline,
  Email,
  ErrorOutline
} from '@styled-icons/material-outlined'
import React, { useState } from 'react'
import TextField from '../TextField'
import {
  FormWrapper,
  FormLoading,
  FormError,
  FormSuccess
} from 'components/Form'
import Button from '../Button'
import { useRouter } from 'next/router'
import { FieldErrors, forgotValidate } from 'utils/validations'

const FormForgotPassword = () => {
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ email: '' })
  const [loading, setLoading] = useState(false)

  const routes = useRouter()
  const { push, query } = routes

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = forgotValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    //enviar um post para /forgot-password pedindo um email
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    )

    const data = await response.json()
    setLoading(false)

    if (data.error) {
      setFormError(data.message[0].messages[0].message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <FormWrapper>
      {success ? (
        <FormSuccess>
          <CheckCircleOutline />
          You just received an E-mail
        </FormSuccess>
      ) : (
        <>
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

            <Button type="submit" size="large" fullWidth disabled={loading}>
              {loading ? <FormLoading /> : <span>Send e-mail</span>}
            </Button>
          </form>
        </>
      )}
    </FormWrapper>
  )
}

export default FormForgotPassword
