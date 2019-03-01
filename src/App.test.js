import React from 'react';
import axios from 'axios';
import { flattenMessages } from './utils';
import { render, cleanup, wait } from 'react-testing-library';
import 'jest-dom/extend-expect';

import App from './App';

import { IntlProvider } from 'react-intl';
import messages_es from './i18n/es.json';
import messages_en from './i18n/en.json';

const messages = {
  es: messages_es,
  en: messages_en,
};

const response = {
  data: {
    user: {
      Email: 'fcoronel@makingsense.com',
    },
  },
};

describe('App component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    axios.get = jest.fn((url) => {
      if (url === process.env.REACT_APP_API_URL + '/Reports/Reports/GetUserData') {
        return Promise.resolve(response);
      }
    });
  });

  it('renders app component', () => {
    const { getByText } = render(
      <IntlProvider locale="en" messages={flattenMessages(messages['en'])}>
        <App />
      </IntlProvider>,
    );
  });

  it('fetches user and display user data', async () => {
    const { getByText } = render(
      <IntlProvider locale="en" messages={flattenMessages(messages['en'])}>
        <App />
      </IntlProvider>,
    );

    await wait(() => getByText(response.data.user.Email));

    const userEmail = getByText(response.data.user.Email);

    expect(userEmail).toBeDefined();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      process.env.REACT_APP_API_URL + '/Reports/Reports/GetUserData',
      {
        withCredentials: 'include',
      },
    );
  });
});
