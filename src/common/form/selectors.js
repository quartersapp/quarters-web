export const createFormValuesSelector = form => state => {
  const formState = state.form[form]
  if (!formState) return {}

  return Object.assign(
    {},
    formState.initialValues,
    formState.values
  )
}
