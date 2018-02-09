import React from 'react'

const Input = props => {
  const { type, field, form: { touched, errors }, ...otherProps } = props
  return (
    <span>
      <input {...field} {...otherProps} />
      {touched[field.name] && typeof errors[field.name] === 'string' && (
        <span style={{ color: 'red' }}>{errors[field.name]}</span>
      )}
    </span>
  )
}

export default Input
