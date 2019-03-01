import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { addLocaleData, FormattedMessage, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import messages_es from './i18n/es.json';
import messages_en from './i18n/en.json';
import { flattenMessages } from './utils';
import { DopplerSessionManager } from './services/dopplerSession';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const messages = {
  es: messages_es,
  en: messages_en,
};

addLocaleData([...en, ...es]);

class App extends Component {
  constructor() {
    super();

    this.dopplerSessionManager = new DopplerSessionManager();

    //TODO: this hardcoded data will depend by the app language
    const locale = navigator.language.toLowerCase().split(/[_-]+/)[0] || 'en';
    this.state = {
      dopplerSession: this.dopplerSessionManager.session,
      i18n: {
        locale: locale,
        messages: flattenMessages(messages[locale]),
      },
    };
  }

  componentDidMount() {
    this.dopplerSessionManager.initialize((s) => {
      this.setState({ dopplerSession: s });
    });
  }

  componentWillUnmount() {
    this.dopplerSessionManager.finalize();
  }

  render() {
    const isLoggedIn = this.state.dopplerSession.status === 'authenticated';
    const i18n = this.state.i18n;
    return (
      <IntlProvider locale={i18n.locale} messages={i18n.messages}>
        {isLoggedIn ? (
          <>
            <Header />
            <img src={logo} alt="logo" />
            <Footer />
          </>
        ) : (
          <div>
            <FormattedMessage id="loading" />
          </div>
        )}
      </IntlProvider>
    );
  }
}

export default App;
