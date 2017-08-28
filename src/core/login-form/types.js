import { namespacer } from 'common/helpers'

const namespace = namespacer('LOGIN')

export const CHANGE_VALUE = namespace('CHANGE_VALUE')
export const RESET_FORM = namespace('RESET_FORM')
export const LOGIN_REQUEST = namespace('LOGIN_REQUEST')
export const LOGIN_SUCCESS = namespace('LOGIN_SUCCESS')
export const LOGIN_ERROR = namespace('LOGIN_ERROR')
export const LOGOUT = namespace('LOGOUT')
