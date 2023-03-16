import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutModalComponent } from '../about-modal.component';
import { AboutMainComponent } from '../main/about-main.component';

const routes: Routes = [
    {
        path: '', component: AboutMainComponent,
        children: [
            { path: '', component: AboutModalComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule { }
