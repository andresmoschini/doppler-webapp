import React from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IntlProvider from '../../../i18n/DopplerIntlProvider.double-with-ids-as-values';
import CampaignsHistory from './CampaignsHistory';
import { AppServicesProvider } from '../../../services/pure-di';

describe('CampaignsHistory component', () => {
  afterEach(cleanup);

  const campaignDeliveryCollection = {
    items: [
      {
        campaignId: 1,
        campaignName: 'Campaña estacional de primavera',
        campaignSubject: '¿Como sacarle provecho a la primavera?',
        deliveryStatus: 'opened',
        clicksCount: 2,
      },
    ],
    currentPage: 0,
    itemsCount: 1,
    pagesCount: 1,
  };

  const subscriber = {
    email: 'test@test.com',
    fields: [
      {
        name: 'FIRSTNAME',
        value: 'Manuel',
        predefined: true,
        private: true,
        readonly: true,
        type: 'boolean',
      },
    ],
    unsubscribedDate: '2019-11-27T18:05:40.847Z',
    unsubscriptionType: 'hardBounce',
    manualUnsubscriptionReason: 'administrative',
    unsubscriptionComment: 'test',
    status: 'active',
    score: 0,
  };

  it('should show subscriber campaigns deliveries', async () => {
    // Arrange
    const dopplerApiClientDouble = {
      getSubscriberSentCampaigns: async () => {
        return { success: true, value: campaignDeliveryCollection };
      },
      getSubscriber: async () => {
        return { success: true, value: subscriber };
      },
    };

    // Act
    const { getByText } = render(
      <AppServicesProvider
        forcedServices={{
          dopplerApiClient: dopplerApiClientDouble,
        }}
      >
        <IntlProvider>
          <CampaignsHistory />
        </IntlProvider>
      </AppServicesProvider>,
    );
    // Assert
    await wait(() =>
      expect(getByText('¿Como sacarle provecho a la primavera?')).toBeInTheDocument(),
    );
  });

  it('should show error message', async () => {
    // Arrange
    const dopplerApiClientDouble = {
      getSubscriberSentCampaigns: async () => {
        return { success: false };
      },
      getSubscriber: async () => {
        return { success: false };
      },
    };

    // Act
    const { getByText } = render(
      <AppServicesProvider
        forcedServices={{
          dopplerApiClient: dopplerApiClientDouble,
        }}
      >
        <IntlProvider>
          <CampaignsHistory />
        </IntlProvider>
      </AppServicesProvider>,
    );
    // Assert
    await wait(() => expect(getByText('common.unexpected_error')).toBeInTheDocument());
  });

  it('should show subscriber firstName', async () => {
    // Arrange
    const dopplerApiClientDouble = {
      getSubscriberSentCampaigns: async () => {
        return { success: true, value: campaignDeliveryCollection };
      },
      getSubscriber: async () => {
        return { success: true, value: subscriber };
      },
    };

    // Act
    const { getByText } = render(
      <AppServicesProvider
        forcedServices={{
          dopplerApiClient: dopplerApiClientDouble,
        }}
      >
        <IntlProvider>
          <CampaignsHistory />
        </IntlProvider>
      </AppServicesProvider>,
    );
    // Assert
    await wait(() => expect(getByText('Manuel')).toBeInTheDocument());
  });
});