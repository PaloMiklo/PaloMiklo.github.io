import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-closing-cross',
  templateUrl: './closing-cross.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClosingCrossComponent {
  public modalClosed = new EventEmitter<boolean>();
  public readonly onClose = (): void => this.modalClosed.emit(true);
}
