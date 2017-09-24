import PropTypes from 'prop-types'
import { kea } from 'kea'
import { combineValidators, isRequired } from 'revalidate'

const initialValues = { email: '', password: '' }

const validate = combineValidators({
  email: isRequired('Email'),
  password: isRequired('Password')
})

export default kea({
  path: () => ['core', 'loginForm'],

  actions: () => ({
    reset: true,
    changeValue: (field, value) => ({ field, value })
  }),

  reducers: ({ actions }) => ({
    values: [initialValues, PropTypes.object.isRequired, {
      [actions.changeValue]: (state, { field, value }) => {
        return Object.assign({}, state, { [field]: value })
      },
      [actions.reset]: () => initialValues
    }]
  }),

  selectors: ({ selectors }) => ({
    valid: [
      function () { return [selectors.values] },
      values => {
        const errors = validate(values)
        return Object.keys(errors).length === 0
      },
      PropTypes.bool.isRequired
    ]
  })
})
