import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class AuthGuardService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): boolean {
    localStorage.setItem('isLoggedIn', 'true');
    return this.isLoggedIn = true;
  }

  logout(): boolean {
    localStorage.setItem('isLoggedIn', 'false');
    return this.isLoggedIn = false;
  }
}
