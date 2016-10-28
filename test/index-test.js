import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';

import App from '../src/components/app';
import { createStore } from '../src/store';

const bandReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_BAND':
      return [...state, action.payload];
    default:
      return state;
  }
}

const store = createStore(bandReducer);


describe('<App />', function () {
  it('should have access to the store', function () {
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.props().store).toNotEqual(undefined, 'The `store` does not exist in props');
    expect(wrapper.props().store).toBeA('object', 'The `store` is not an object');
    expect(wrapper.props().store.dispatch).toBeA('function', '`dispatch` is not a function');
    expect(wrapper.props().store.getState).toBeA('function', '`getState` is not a function');
    expect(wrapper.props().store.subscribe).toBeA('function', '`subscribe` is not a function');
  });

  it('should have an input field', function () {
    const component = mount(<App store={store} />);

    expect(component.find('input').get(0)).toExist('Cannot find `input` field');
    const input = component.find('input').get(0);
    input.value = 'The Beatles';
    expect(input.value).toEqual('The Beatles', 'Cannot enter text to `input` field');
  });

  it('should have a submit button', function () {
    const component = mount(<App store={store} />);
    const input = component.find('input').get(0);
    input.value = 'Alvin and the Chipmunks';

    const form = component.find('form').at(0);
    form.simulate('submit');
  });

  it('should display a new band as a new `li` within a `ul` when a band is submitted', function () {
    const component = mount(<App store={store} />);
    const input = component.find('input').get(0);
    input.value = 'The Beatles';
    const form = component.find('form').at(0);
    form.simulate('submit');

    expect(component.find('ul')).toExist('Cannot find `ul` tag on page')
    expect(component.find('ul').childAt(0).type()).toEqual('li', 'Bands are not created within `li` tags')
    expect(component.find('ul').childAt(0).length).toEqual(1, 'Bands do not appear on page after `submit`')
    expect(component.find('ul').childAt(0).length).toEqual(1, 'Bands do not appear on page after `submit`')
    expect(component.props().store.getState()[1].title).toEqual('The Beatles', 'Multiple bands do not appear on page `submit`')

  });
});
