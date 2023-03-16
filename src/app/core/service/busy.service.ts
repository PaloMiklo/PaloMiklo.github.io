import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusyService {
  public readonly ready = new BehaviorSubject<boolean>(true);
  public readonly ready$ = this.ready.asObservable();

  private readonly _currentLoadings = new Map<string, boolean>();

  private constructor() { }

  public readonly setLoading = (loading: boolean, url: string): void => {
    if (!url) {
      throw new Error('The request url must be provided to the setLoading method.');
    }
    if (loading === true) {
      this._currentLoadings.set(url, loading);
      this.ready.next(false);
    } else if (loading === false && this._currentLoadings.has(url)) {
      this._currentLoadings.delete(url);
    }

    this._currentLoadings.size === 0 && this.ready.next(true);
  };
}
