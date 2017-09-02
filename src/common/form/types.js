import { namespacer } from 'common/helpers'

const namespace = namespacer('FORM')

export const REGISTER_FORM = namespace('REGISTER_FORM')
export const DEREGISTER_FORM = namespace('DESTROY_FORM')
export const MOVE_REGISTERED_FORM = namespace('MOVE_REGISTERED_FORM')
export const CHANGE_FORM_VALUE = namespace('CHANGE_FORM_VALUE')
