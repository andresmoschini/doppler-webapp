import React, { Component } from 'react';
import './App.css';
import { FormattedMessage } from 'react-intl';
import { SessionManager } from './services/session';
import AppAuthenticated from './AppAuthenticated';
import { IntlProvider, addLocaleData } from 'react-intl';
import { flattenMessages } from './utils';
import messages_es from './i18n/es.json';
import messages_en from './i18n/en.json';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

const messages = {
  es: messages_es,
  en: messages_en,
};

addLocaleData([...en, ...es]);

class App extends Component {
  constructor(props) {
    super(props);

    this.sessionManager = new SessionManager((session) => {
      this.setState({ session: session });
    });

    this.state = {
      session: this.sessionManager.session,
    };

    // Debería ir en el DidMount? (o algo asi)
    this.sessionManager.synchronize();
  }

  render() {
    const language = this.state.session.language;
    const sessionStatus = this.state.session.status;
    const dopplerUserData = this.state.session.dopplerUserData;
    return (
      <IntlProvider locale={language} messages={flattenMessages(messages[language])}>
        <>
          {sessionStatus === 'authenticated' ? (
            <AppAuthenticated dopplerUserData={dopplerUserData} />
          ) : (
            <FormattedMessage id="loading" />
          )}
          {/* It is only to see if language changes: */}
          <FormattedMessage id="loading" />
        </>
      </IntlProvider>
    );
  }
}

export default App;
