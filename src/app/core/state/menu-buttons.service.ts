import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ModalTypes } from '../enum';

@Injectable({ providedIn: 'root' })
export class MenuButtonsStateService {
  public activeMenuBtn: ModalTypes | undefined = undefined;
  public changesOnMenuButtons = new Subject<void>();
  public changesOnMenuButtons$ = this.changesOnMenuButtons.asObservable();

  private constructor(private readonly _router: Router) {
    const currUrl = this._router.routerState.snapshot.url;
    const active = currUrl.substring(currUrl.indexOf('(') + 1, currUrl.indexOf('-')) as ModalTypes;
    this.activeMenuBtn = active ?? undefined;
    this.changesOnMenuButtons.next();
  }

  public readonly resetActiveMenuBtn = (): void => {
    this.activeMenuBtn = undefined;
    this.changesOnMenuButtons.next();
  }
}
