import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'flk-datePicker',
  templateUrl: './flk-datePicker.component.html',
  styleUrls: ['./flk-datePicker.component.css']
})
export class FlkDatePickerComponent implements OnInit {
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() holidays: string[];
  @Input() weekHolidays: number[];//[0..6]

  @Output() selected = new EventEmitter<any>();


  public days = [];
  private _week = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  private _months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private _currentWeekDate;
  private _nbWeek = 0;
  ngOnInit() {
    try {
      if (!this._validateDateFormat(this.startDate))
        throw "Error! [startDate] Invalid Date Format. Please Enter The Date In The Format'YYYY-MM-DD'.";
      if (!this._validateDateFormat(this.endDate))
        throw "Error! [endDate] Invalid Date Format. Please Enter The Date In The Format'YYYY-MM-DD'.";

      this._currentWeekDate = new Date(this.startDate);
      this._update();
    } catch (error) {
      console.error(error);
    }
  }


  selectDay(day) {
    this.selected.emit(day);
  }

  nav(action: string) {
    if (action == "next") {
      this._nbWeek++;
      this._currentWeekDate.setDate(this._currentWeekDate.getDate() + 7);
      this._update();
    } else if (action == "prev") {
      if (this._nbWeek > 0) {
        this._nbWeek--;
        if (this._nbWeek == 0) {/*disable prev btn*/ }
        this._currentWeekDate.setDate(this._currentWeekDate.getDate() - 7);
        this._update();
      }
    }
  }

  private _update() {
    let idate = new Date(this._currentWeekDate.getTime());
    this.days = [];
    this._week.forEach((e, i) => {
      idate.setDate(idate.getDate() - idate.getDay() + i);
      this.days.push({
        name: e,
        month: this._months[idate.getMonth()],
        date: idate.getDate()
      });
    });
  }

  private _validateDateFormat(date: string) {
    return date ? date.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/) ? true : false : false;
  }
}
