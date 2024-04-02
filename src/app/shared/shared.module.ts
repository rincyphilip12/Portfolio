import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { GridsComponent } from './components/grids/grids.component';
import { ManeuverNavbarComponent } from './components/maneuver-navbar/maneuver-navbar.component'
@NgModule({
  declarations: [GridsComponent, ManeuverNavbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [GridsComponent, ManeuverNavbarComponent]
})
export class SharedModule { }
