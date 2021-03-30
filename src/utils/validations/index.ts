import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import Joi from 'joi'

const fieldValidations = {
  username: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Suas senhas não conferem.' })
}

export type FieldErrors = {
  [key: string]: string
}

function getFieldErrors(objError: Joi.ValidationResult) {
  const errors: FieldErrors = {}

  if (objError.error) {
    objError.error.details.forEach((err) => {
      errors[err.path.join('.')] = err.message
    })
  }

  return errors
}

export function signUpValidation(values: UsersPermissionsRegisterInput) {
  const schema = Joi.object(fieldValidations)

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type SignInValues = Omit<UsersPermissionsRegisterInput, 'username'>

export function signInValidation(values: SignInValues) {
  const { email, password } = fieldValidations
  const schema = Joi.object({ email, password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type ForgotValidateParams = Pick<UsersPermissionsRegisterInput, 'email'>

export function forgotValidate(values: ForgotValidateParams) {
  const { email } = fieldValidations

  const schema = Joi.object({ email })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type ResetValidadeParams = {
  password: string
  confirm_password: string
}

export function resetValidate(values: ResetValidadeParams) {
  const { password, confirm_password } = fieldValidations

  const schema = Joi.object({ password, confirm_password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}
