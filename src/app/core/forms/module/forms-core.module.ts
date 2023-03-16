import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationComponent } from '../validation/validation.component';


@NgModule({
    declarations: [ValidationComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [
        ValidationComponent,
        ReactiveFormsModule
    ]
})
export class FormsCoreModule { }
