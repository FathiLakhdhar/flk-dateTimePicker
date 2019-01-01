import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlkDatePickerComponent } from './flk-datePicker.component';
import { FlkTimePickerComponent } from './flk-timePicker.component';

@NgModule({
  declarations: [
  	FlkDatePickerComponent, 
    FlkTimePickerComponent
  ],
  imports: [CommonModule],
  providers: [],
  exports: [FlkDatePickerComponent, FlkTimePickerComponent]
})
export class FlkDateTimePickerModule { }
