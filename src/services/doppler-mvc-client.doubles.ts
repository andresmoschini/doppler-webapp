import { DopplerMvcClient, mapHeaderDataJson } from './doppler-mvc-client';
import headerDataJson from '../headerData.json';

export class HardcodedDopplerMvcClient implements DopplerMvcClient {
  public async getUserData() {
    const { user, nav } = mapHeaderDataJson(headerDataJson);

    return {
      user: {
        ...user,
        email: 'hardcoded@email.com',
      },
      nav: nav,
    };
  }
}
