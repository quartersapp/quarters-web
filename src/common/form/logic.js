import PropTypes from 'prop-types'
import { kea } from 'kea'

export default (options = {}) => {
  const { form } = options

  if (!form) throw new Error('form name must be set')

  return kea({
    path: () => ['form', form],

    actions: () => ({
      changeFormValue: (form, field, value) => ({ form, field, value }),
      registerForm: form => ({ form }),
      deregisterForm: form => ({ form })
    }),

    reducers: ({ actions }) => ({
      values: [{ actions }, PropTypes.object.isRequired, {
        [actions.changeFormValues]: (state, { payload: { field, value } }) => {
          return Object.assign({}, state, { [field]: value })
        }
      }]
    })
  })
}
