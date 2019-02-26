// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import dopplerUserData from '../dopplerUserData.json';

type SessionStatus = "unknown" | "authenticated" | "not-authenticated";
type Language = 'en' | 'es';

interface DopplerSession {
  status: SessionStatus;
  language: Language;
  dopplerUserData: any;
}

const defaultSession : DopplerSession = {
  status: 'unknown',
  language: navigator.language.toLowerCase().split(/[_-]+/)[0] as Language || 'en',
  dopplerUserData: null
};

export class SessionManager {
  private _currentSession : DopplerSession;
  private _handler : (s: DopplerSession) => void;

  constructor(handler: (s: DopplerSession) => void) {
    this._handler = handler;
    this._currentSession = {...defaultSession};
  }

  private dispatch (data: any) {
    this._currentSession = {...defaultSession, ...data};
    this._handler(this._currentSession);
  }

  public get session() {
    return this._currentSession;
  }

  public synchronize() {
    setTimeout(() => {
      this.dispatch({status: 'authenticated', language: dopplerUserData.user.lang, dopplerUserData: dopplerUserData });
    }, 3000);
  }

}
