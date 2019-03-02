import React from 'react';
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

function createDoubleSessionManager() {
  const double = {
    initialize: (handler) => {
      double.updateAppSession = handler;
    },
    finalize: () => {},
    session: {
      status: 'non-authenticated',
    },
  };
  return double;
}

describe('App component', () => {
  afterEach(cleanup);

  it('renders app component', () => {
    const dependencies = {
      sessionManager: createDoubleSessionManager(),
    };

    const { getByText } = render(
      <IntlProvider locale="en" messages={flattenMessages(messages['en'])}>
        <App dependencies={dependencies} />
      </IntlProvider>,
    );
  });

  it('updates content after successful authentication', async () => {
    // Arrange
    const expectedEmail = 'fcoronel@makingsense.com';

    const dependencies = {
      sessionManager: createDoubleSessionManager(),
    };

    const { getByText } = render(
      <IntlProvider locale="en" messages={flattenMessages(messages['en'])}>
        <App dependencies={dependencies} />
      </IntlProvider>,
    );

    getByText('Loading...');

    // Act
    dependencies.sessionManager.updateAppSession({ status: 'authenticated' });

    // Assert
    getByText(expectedEmail);
    // TODO: test session manager behavior
  });
});
