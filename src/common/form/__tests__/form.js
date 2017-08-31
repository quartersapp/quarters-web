/* eslint-env jest */

import React from 'react'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'
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

  it('sets the context for children', () => {
    const TestComponent = props => null
    const TestComponentWithContext = getContext({ form: PropTypes.string })(TestComponent)
    const wrapper = mount(
      <Form name={FORM_NAME} initializeForm={noop}>
        <TestComponentWithContext />
      </Form>
    )

    expect(wrapper.find(TestComponent).prop('form')).toEqual(FORM_NAME)
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

  it('can disable destroy on unmount', () => {
    const destroyForm = jest.fn()

    const wrapper = mount(
      <Form
        name={FORM_NAME}
        initializeForm={noop}
        destroyForm={destroyForm}
        destroyOnUnmount={false}
      />
    )

    wrapper.unmount()
    expect(destroyForm).not.toBeCalled()
  })

  it('dispatches a rename action if the name prop changes', () => {
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
