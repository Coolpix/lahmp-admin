import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecoverComponent} from "./recover.component";

const recoverRoutes: Routes = [{
  path: ':token',
  data: {
    title: 'Recover Password'
  },
  component: RecoverComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(recoverRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecoverRouteModule { }
