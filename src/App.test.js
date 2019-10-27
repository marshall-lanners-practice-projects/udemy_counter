import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

it('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

it('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

it('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

it('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

it('clicking button increments counter in display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  //find display and test
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

it('clicking button decrements counter in display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  //find display and test
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

it('does not go below zero', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  //find display and test
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(0);
});

it('shows error message if clicked below 0', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  //find display and test
  const error = findByTestAttr(wrapper, 'error-display');
  expect(error.text()).toContain("you can't go below 0");
});

it('removes error message', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  const button2 = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  button2.simulate('click');

  const error = findByTestAttr(wrapper, 'error-display');
  expect(error.text()).toContain('');
});
