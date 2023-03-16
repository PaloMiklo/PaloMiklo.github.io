import { NgModule } from '@angular/core';
import { ModalDirective } from '../base/modal.directive';
import { ClosingCrossComponent } from '../closing-cross/closing-cross.component';

const components = [
    ModalDirective,
    ClosingCrossComponent
];

@NgModule({
    declarations: [components],
    imports: [],
    providers: [],
    exports: [...components]
})
export class CommonModalModule { }
