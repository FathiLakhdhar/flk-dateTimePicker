import { Component, OnInit } from '@angular/core';

import { FlkDateTimePickerOptions } from './flk-dateTimePicker/model/flk-dateTimePickerOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public startDate : string;
  public endDate : string;
  public holidays : string[] = [];
  public weekHolidays = [0, 6];//0..6, 0 -> Sunday | 6 -> Saturday
  public datetimeOptions : FlkDateTimePickerOptions;
  ngOnInit(){
    let today = new Date();
    this.startDate = (new Date((new Date()).setDate(today.getDate() - Math.floor(Math.random() * 7)))).toISOString().split("T")[0];
    this.endDate = (new Date((new Date()).setDate(today.getDate() + 20 + Math.floor(Math.random() * 20)))).toISOString().split("T")[0];
    // random 3 holidays [today+1 .. today + 20]
    while(this.holidays.length < 3){
      let randomHoliday = (new Date( (new Date()).setDate(today.getDate() + 1 + Math.floor(Math.random() * 20)))).toISOString().split("T")[0];
      if(!this.holidays.includes(randomHoliday)) { this.holidays.push(randomHoliday) }
    }


    this.datetimeOptions = {
      datePicker: {startDate: this.startDate, endDate: this.endDate, holidays: this.holidays, weekHolidays: this.weekHolidays},
      timePicker: {startTime: '00:00 am', endTime: '12:00 pm', duration: '00:30', startEvery: '00:05'}
    }
  }
  selectDate(event : any){
    console.log("Date : ", event);
  }

  selectTime(event : any){
    console.log("Time : ", event);
  }
}
