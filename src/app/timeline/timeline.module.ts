import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline.component';


@NgModule({
  declarations: [TimelineComponent],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    SharedModule
  ]
})
export class TimelineModule { }
