import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement } from '@testing-library/react';
jest.mock('../services/bars');
import App from '../App';

describe('<App />', () => {
  test('if no user logged in, Sign up page is rendered', async () => {
    const component = render(
        <App />
    );
    component.rerender(<App />);

    const menuBar = component.container.querySelector('.menuFlexLeft');
    expect(menuBar).toHaveTextContent('Sign up');
  });

  test('when logged in, My page is rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    };

    localStorage.setItem('loggedUserJSON', JSON.stringify(user));

    console.log('window localStorage testissä', window.localStorage);
    const component = render(
        <App />
    );
    component.rerender(<App />);

    component.debug();
    const menuBar = component.container.querySelector('.menuFlexLeft');
    expect(menuBar).toHaveTextContent('My page');
  });
});