import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Bar from '../components/Bar';

describe('<Bar />', () => {

  const user = {
    username: 'username',
    name: 'name',
    passwordHash: 'passwordHash'
  };

  const bars = [{
    name: 'test name',
    address: 'test address',
    city: 'test city',
    likes: 4000,
    prices: {
      beer: 4
    },
    user: user
  }];


  const notification = { msg: null, sort: null };

  let component;

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Bar
        bar={bars[0]}
        bars={bars}
        setBars={mockHandler}
        user={user}
        notification={notification}
        setNotification={mockHandler}
      />
    );
    //component.debug();
  });

  test('at start bar name and city are visible', () => {
    const div = component.container.querySelector('.extraInfo');
    expect(div).toHaveStyle('display: none');
    expect(component.container).toHaveTextContent(
      'test name test city'
    );
  });

  test('after clicking bar address is shown', () => {
    const barListItem = component.container.querySelector('.barListItem');
    fireEvent.click(barListItem);
    expect(component.container).toHaveTextContent(
      'test address'
    );
  });

  test('after clicking bar, likes are shown', () => {
    const barListItem = component.container.querySelector('.barListItem');
    fireEvent.click(barListItem);
    expect(component.container).toHaveTextContent(
      '4000 likes'
    );
  });

});