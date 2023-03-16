import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact-main',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactMainComponent { }
