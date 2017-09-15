import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "./navigation/navigation.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
  ],
  exports:[
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
  ]

})

export class SharedModule { }
