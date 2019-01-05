import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FlkTime } from './model/flk-time';

@Component({
    selector: 'flk-timePicker',
    templateUrl: './flk-timePicker.component.html',
    styleUrls: ['style.css', './flk-timePicker.component.css']
})
export class FlkTimePickerComponent implements OnInit {
    @Input() startTime: string;
    @Input() endTime: string;
    @Input() duration: string;
    @Input() startEvery: string;

    @Output() selected = new EventEmitter<FlkTime>();

    private times: FlkTime[] = []; // {heurs: "08", minutes: "30", mode: "am"}
    private pas = 7;
    private _index = this.pas;
    private prevDisabled = true;
    private nextDisabled = false;
    constructor() { }

    ngOnInit(): void {
        try {
            if (this.regexTime(this.startTime) == null || this.regexTime(this.startTime)[3] == undefined)
                throw "Error! [startTime] Invalid Time Format. Please Enter The Time In The Format 'hh:mm am|pm'.";
            if (this.regexTime(this.endTime) == null || this.regexTime(this.endTime)[3] == undefined)
                throw "Error! [endTime] Invalid Time Format. Please Enter The Time In The Format 'hh:mm am|pm'.";
            if (this.regexTime(this.duration) == null)
                throw "Error! [duration] Invalid Time Format. Please Enter The Time In The Format 'hh:mm'.";
            if (this.regexTime(this.startEvery) == null)
                throw "Error! [startEvery] Invalid Time Format. Please Enter The Time In The Format 'hh:mm'.";

            this._update();
        } catch (error) { console.error(error); }
    }

    private _update() {
        let [startTime, startHeurs, startMinutes, startMode] = this.regexTime(this.startTime);
        let [endTime, endHeurs, endMinutes, endMode] = this.regexTime(this.endTime);
        let [duration, durationHeurs, durationMinutes] = this.regexTime(this.duration);
        let [startEvery, startEveryHeurs, startEveryMinutes] = this.regexTime(this.startEvery);

        let xh = parseInt(startHeurs);
        let xm = parseInt(startMinutes);
        let xmode = startMode;

        let sh = parseInt(startHeurs);
        let eh = parseInt(endHeurs);
        let dh = parseInt(durationHeurs);
        let seh = parseInt(startEveryHeurs);
        let sm = parseInt(startMinutes);
        let em = parseInt(endMinutes);
        let dm = parseInt(durationMinutes);
        let sem = parseInt(startEveryMinutes);

        let count = 0;
        while (!((xmode == endMode) && (xh == eh) && ((xm + dm + sem > em)))) {
            if (count > 0) {
                if ((xm + dm + sem) < 60) {
                    xm += dm + sem;
                } else {
                    xm = (xm + dm + sem) - 60;
                    xh++;
                    if (xmode == "am") {
                        if (xh == 12) xmode = "pm";
                        if (xh == 13) xh = 1;
                    } else if (xmode == "pm") {
                        if (xh == 13) xh = 1;
                        if (xh == 12) {
                            xh = 0;
                            xmode = "am";
                        }
                    }
                }
            }
            this.times.push({ heurs: ((xh < 10) ? ('0' + xh) : ''+xh), minutes: ((xm < 10) ? ('0' + xm) : ''+xm), mode: xmode });
            count++;
        }
    }

    nav(action: string) {
        if (action == "next") {
            if (this.times.length > this._index+this.pas) {
                this._index += this.pas;
                this.prevDisabled = false;
            } else {
                this._index = this.times.length;
                this.nextDisabled = true;
            }
        } else if (action == "prev") {
            if (this._index-this.pas <= this.pas) {
                this._index = this.pas;
                this.prevDisabled = true;
            }else{
                this._index -= this.pas;
            }
            if (this.times.length > this._index) this.nextDisabled = false;
        }
    }

    private selectTime(time: FlkTime){
        this.selected.emit(time);
    }

    private regexTime(time: string) {// format time hh:mm || hh:mmam|pm || hh:mm am|pm
        return /^([0][0-9]|[1][0-2]):([0-5][0-9])\s?(pm|am)?/i.exec(time);
    }
}
