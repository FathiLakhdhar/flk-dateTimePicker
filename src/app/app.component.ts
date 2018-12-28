import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public startDate = "2018-12-26";
  public endDate = "2019-01-20";
  public holidays = ["2018-12-25", "2018-12-28", "2019-01-13"];
  public weekHolidays = [0, 6];
  select(event : any){
    console.log("Selected : ", event);
  }
}
