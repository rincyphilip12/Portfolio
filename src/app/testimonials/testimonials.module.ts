import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { TestimonialsComponent } from './testimonials.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [TestimonialsComponent],
  imports: [
    CommonModule,SharedModule,
    TestimonialsRoutingModule
  ]
})
export class TestimonialsModule { }
