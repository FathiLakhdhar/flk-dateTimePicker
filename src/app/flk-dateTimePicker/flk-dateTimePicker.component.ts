import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { FlkDateTimePickerOptions } from './model/flk-dateTimePickerOptions';
import { FlkTime } from './model/flk-time';
import { FlkDate } from './model/flk-date';

@Component({
  selector: 'flk-dateTimePicker',
  templateUrl: './flk-dateTimePicker.component.html',
  styleUrls: ['style.css', './flk-dateTimePicker.component.css']
})
export class FlkDateTimePickerComponent implements OnInit {
    @Input() options : FlkDateTimePickerOptions;

    private days : FlkDate[] = [];
    private times: FlkTime[] = [];
    private pas = 7
    private _index = this.pas;

    ngOnInit() {
        [0,1,2,3,4,5,6].forEach(n => {
            this.days.push({name: "FR", month: "Jan", date: 4, isHoliday: false, ISODate: "2019-01-04"});
            this.times.push({heurs: "01", minutes: "45", mode: "am"});
        });
    }
    private isToday(IsoDate : string){ return this._dateToISOFormat(new Date()) == IsoDate}
    private _dateToISOFormat(date : Date) : string {
        return date.toISOString().split("T")[0];
    }
}