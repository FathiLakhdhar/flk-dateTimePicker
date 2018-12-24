import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'flk-datePicker',
  templateUrl: './flk-datePicker.component.html',
  styleUrls: ['./flk-datePicker.component.css']
})
export class FlkDatePickerComponent {
    @Input() startDate : string;
    @Input() endDate : string;
    @Input() holidays : string[];
    @Input() weekHolidays : number[];//[0..6]

    @Output() selected = new EventEmitter<any>();


    click( ) {
      this.selected.emit(new Date());
    }
}
