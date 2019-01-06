import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlkDatePickerComponent } from './flk-datePicker.component';
import { FlkTimePickerComponent } from './flk-timePicker.component';
import { FlkDateTimePickerComponent } from './flk-dateTimePicker.component';

@NgModule({
  declarations: [
  	FlkDatePickerComponent, 
    FlkTimePickerComponent,
    FlkDateTimePickerComponent
  ],
  imports: [CommonModule],
  providers: [],
  exports: [FlkDatePickerComponent, FlkTimePickerComponent, FlkDateTimePickerComponent]
})
export class FlkDateTimePickerModule { }
