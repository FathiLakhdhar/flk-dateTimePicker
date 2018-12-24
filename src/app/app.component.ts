import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  public startDate = "2018.12.12";
  public endDate = "2018.12.16";
  public holidays = ["2018.12.14", "2018.12.13"];
  public weekHolidays = [0, 5];
  select(event : string){
    alert("Selected : " + event);
  }
}
