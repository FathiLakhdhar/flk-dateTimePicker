import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlkDatePickerComponent } from './flk-datePicker.component';

@NgModule({
  declarations: [
  	FlkDatePickerComponent
  ],
  imports: [CommonModule],
  providers: [],
  exports: [FlkDatePickerComponent]
})
export class FlkDateTimePickerModule { }
