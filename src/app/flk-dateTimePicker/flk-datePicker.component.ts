import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'flk-datePicker',
  templateUrl: './flk-datePicker.component.html',
  styleUrls: ['style.css', './flk-datePicker.component.css']
})
export class FlkDatePickerComponent implements OnInit {
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() holidays: string[] = [];
  @Input() weekHolidays: number[] = [0];//[0..6] default Sunday is Holiday

  @Output() selected = new EventEmitter<any>();


  public days = [];
  private _week = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  private _months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private _currentWeekDate;
  private _nbWeek = 0;
  private prevDisabled : boolean = true;
  private nextDisabled : boolean = false;
  private dataWeektxt = "";
  private dataYeartxt = "";
  ngOnInit() {
    try {
      if (!this._validateDateFormat(this.startDate))
        throw "Error! [startDate] Invalid Date Format. Please Enter The Date In The Format 'YYYY-MM-DD'.";
      if (!this._validateDateFormat(this.endDate))
        throw "Error! [endDate] Invalid Date Format. Please Enter The Date In The Format 'YYYY-MM-DD'.";

      this.holidays.forEach(h=>{
        if (!this._validateDateFormat(h))
          throw "Error! [holidays] Invalid Date Format. Please Enter The Date In The Format 'YYYY-MM-DD'.";
      });

      if(this.weekHolidays == null || this.weekHolidays.constructor != Array)
        throw "Error! [weekHolidays] must be an array of number [0..6].";
      this._currentWeekDate = this._ISOFormatToDate(this.startDate);
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
      if (this._isLastWeek()){ this.nextDisabled = true; return }
      this._nbWeek++;
      if (this._nbWeek == 1) { this.prevDisabled = false }
      this._currentWeekDate.setDate(this._currentWeekDate.getDate() + 7);
      this._update();
    } else if (action == "prev") {
      if (this._nbWeek > 0) {
        this._nbWeek--;
        if (this._nbWeek == 0) { this.prevDisabled = true }
        if (this._isLastWeek()){ this.nextDisabled = false }
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
        date: idate.getDate(),
        isHoliday : this._isHoliday(idate),
        ISODate : this._dateToISOFormat(idate)
      });
    });
    this._updateAttrDataWeek();
    this._updateAttrDataYear()
  }

  private _validateDateFormat(date: string) {
    return date ? date.match(/^\d{4}\-\d{2}\-\d{2}$/) ? true : false : false;
  }

  private _isHoliday(date : Date) {
    return this.holidays.includes(this._dateToISOFormat(date)) || this.weekHolidays.includes(date.getDay()) || this._ISOFormatToDate(this.endDate).getTime() < date.getTime() || this._ISOFormatToDate(this.startDate).getTime() > date.getTime();
  }

  private _dateToISOFormat(date : Date) : string {
    return date.toISOString().split("T")[0];
  }
  private _ISOFormatToDate(date : string) : Date {
    return new Date(date);
  }
  private _isLastWeek() : boolean {
    let currentWeekSunday = (new Date(this._currentWeekDate.getTime())).setDate(this._currentWeekDate.getDate() - this._currentWeekDate.getDay());
    let currentWeekSaturday = (new Date(this._currentWeekDate.getTime())).setDate(this._currentWeekDate.getDate() + (6 - this._currentWeekDate.getDay()));
    return (this._ISOFormatToDate(this.endDate).getTime() >= currentWeekSunday && this._ISOFormatToDate(this.endDate).getTime() <= currentWeekSaturday); 
  }
  private _updateAttrDataWeek() {
    if (this._nbWeek == 1) this.dataWeektxt = "Next week";
    else if (this._nbWeek == 0) this.dataWeektxt = "This week";
    else this.dataWeektxt = this._nbWeek + " weeks out";
  }
  private _updateAttrDataYear() {this.dataYeartxt = this._currentWeekDate.getFullYear()}
  private isToday(IsoDate : string){ return this._dateToISOFormat(new Date()) == IsoDate}
}
