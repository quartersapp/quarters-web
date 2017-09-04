/* eslint-env jest */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import Immutable from 'seamless-immutable'
import { createForm } from '../create-form'

const noop = () => {}
const FORM_NAME = 'testForm'

describe('createForm', () => {
  const Form = createForm(FORM_NAME)

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Form registerForm={noop}>
        Form goes here
      </Form>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('sets the form name to the context', () => {
    /* Couldn't get context testing with enzyme working, so this will have to do */
    class ChildComponent extends Component {
      render () {
        return null
      }
    }

    ChildComponent.contextTypes = {
      form: PropTypes.string
    }

    const wrapper = mount(
      <Form registerForm={noop}>
        <ChildComponent />
      </Form>
    )

    const child = wrapper.find(ChildComponent).get(0)
    expect(child.context.form).toEqual(FORM_NAME)
  })

  it('dispatches register and deregister actions on mount/unmount', () => {
    const registerForm = jest.fn()
    const deregisterForm = jest.fn()

    const wrapper = mount(
      <Form registerForm={registerForm} deregisterForm={deregisterForm} />
    )
    expect(registerForm).toBeCalled()
    expect(deregisterForm).not.toBeCalled()

    wrapper.unmount()
    expect(deregisterForm).toBeCalled()
  })

  it('calls props.handleSubmit with the form values onSubmit', () => {
    const handleSubmit = jest.fn()
    const preventDefault = jest.fn()
    const formValues = {
      email: 'test@example.com',
      password: '12345'
    }

    const wrapper = mount(
      <Form registerForm={noop} onSubmit={handleSubmit} values={formValues} />
    )

    wrapper.find('form').simulate('submit', { preventDefault })
    expect(handleSubmit).toBeCalledWith(formValues)
    expect(preventDefault).toBeCalled()
  })
})
