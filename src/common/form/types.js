import { namespacer } from 'common/helpers'

const namespace = namespacer('FORM')

export const INITIALIZE_FORM = namespace('INITIALIZE_FORM')
export const DESTROY_FORM = namespace('DESTROY_FORM')
export const RENAME_FORM = namespace('RENAME_FORM')
export const CHANGE_FORM_VALUE = namespace('CHANGE_FORM_VALUE')
