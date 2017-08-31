/* eslint-env jest */

import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import Immutable from 'seamless-immutable'
import { Form, formValuesSelector } from '../form'

const noop = () => {}
const FORM_NAME = 'testForm'

describe('Form', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Form name={FORM_NAME} initializeForm={noop}>
        Form goes here
      </Form>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('sets the form name to the context', () => {
    /* Couldn't get context testing with enzyme working, so this will have to do */
    expect(Form.childContextTypes).toEqual({ form: PropTypes.string })
    expect(new Form({ name: FORM_NAME }).getChildContext()).toEqual({ form: FORM_NAME })
  })

  it('dispatches initialize and destroy actions on mount', () => {
    const initializeForm = jest.fn()
    const destroyForm = jest.fn()

    const wrapper = mount(
      <Form name={FORM_NAME} initializeForm={initializeForm} destroyForm={destroyForm} />
    )
    expect(initializeForm).toBeCalled()
    expect(destroyForm).not.toBeCalled()

    wrapper.unmount()
    expect(destroyForm).toBeCalled()
  })

  it('dispatches a rename action the form if the name prop changes', () => {
    const renameForm = jest.fn()
    const NEW_FORM_NAME = 'newForm'

    const wrapper = mount(
      <Form name={FORM_NAME} initializeForm={noop} renameForm={renameForm} />
    )
    expect(renameForm).not.toBeCalled()
    wrapper.setProps({ name: NEW_FORM_NAME })
    expect(renameForm).toBeCalledWith(FORM_NAME, NEW_FORM_NAME)
  })

  it('calls props.handleSubmit with the form values onSubmit', () => {
    const handleSubmit = jest.fn()
    const preventDefault = jest.fn()
    const formValues = {
      email: 'test@example.com',
      password: '12345'
    }

    const wrapper = mount(
      <Form name={FORM_NAME} initializeForm={noop} onSubmit={handleSubmit} values={formValues} />
    )

    wrapper.find('form').simulate('submit', { preventDefault })
    expect(handleSubmit).toBeCalledWith(formValues)
    expect(preventDefault).toBeCalled()
  })
})

describe('formValuesSelector', () => {
  let state

  beforeEach(() => {
    state = Immutable.static({
      form: {
        [FORM_NAME]: {
          values: {
            email: 'test@example.com',
            password: '12345'
          }
        }
      }
    })
  })

  it('selects the form values for the current form name', () => {
    const props = { name: FORM_NAME }

    expect(formValuesSelector(state, props)).toEqual({
      email: 'test@example.com',
      password: '12345'
    })
  })
})
