/* eslint-env jest */

import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import createForm, { createForm as createFormComponent } from '../create-form'

const noop = () => {}
const FORM_NAME = 'testForm'

describe('Form', () => {
  it('matches snapshot', () => {
    const Form = createFormComponent({ name: FORM_NAME })
    const tree = renderer.create(
      <Form initializeForm={noop}>
        Form goes here
      </Form>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('sets the form name to the context', () => {
    /* Couldn't get context testing with enzyme working, so this will have to do */
    const Form = createFormComponent({ name: FORM_NAME })
    expect(Form.childContextTypes).toEqual({ form: PropTypes.string })
    expect(new Form().getChildContext()).toEqual({ form: FORM_NAME })
  })

  it('dispatches initialize and destroy actions on mount', () => {
    const Form = createFormComponent({ name: FORM_NAME })

    const initializeForm = jest.fn()
    const destroyForm = jest.fn()

    const wrapper = mount(
      <Form initializeForm={initializeForm} destroyForm={destroyForm} />
    )
    expect(initializeForm).toBeCalled()
    expect(destroyForm).not.toBeCalled()

    wrapper.unmount()
    expect(destroyForm).toBeCalled()
  })

  it('calls props.handleSubmit with the form values onSubmit', () => {
    const Form = createFormComponent({ name: FORM_NAME })
    const handleSubmit = jest.fn()
    const preventDefault = jest.fn()
    const formValues = {
      email: 'test@example.com',
      password: '12345'
    }

    const wrapper = mount(
      <Form initializeForm={noop} onSubmit={handleSubmit} values={formValues} />
    )

    wrapper.find('form').simulate('submit', { preventDefault })
    expect(handleSubmit).toBeCalledWith(formValues)
    expect(preventDefault).toBeCalled()
  })
})

describe('createForm', () => {
  it('throws an error if name is not provided', () => {
    expect(createForm).toThrow(new Error('"name" option is required by createForm'))
  })

  it('returns a connected component', () => {
    const ConnectedForm = createForm({ name: FORM_NAME })
    expect(ConnectedForm.name).toEqual('Connect')
  })
})
