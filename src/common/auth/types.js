import { namespacer } from 'common/helpers'

const namespace = namespacer('AUTH')

export const LOGIN_REQUEST = namespace('LOGIN_REQUEST')
export const LOGIN_SUCCESS = namespace('LOGIN_SUCCESS')
export const LOGIN_ERROR = namespace('LOGIN_ERROR')
export const LOGOUT = namespace('LOGOUT')
