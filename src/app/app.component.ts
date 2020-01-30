import { Component, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, map, shareReplay, tap, distinctUntilChanged } from 'rxjs/operators';

const HrDegrees = 360 / 12;
const MinDegrees = 360 / 60;
const SecDegrees = MinDegrees ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  destroy$: Subject<void> = new Subject();
  /*Observable for hours*/
  hourDegrees$: Observable<number>;
  /*Observable for minutes*/
  minDegrees$: Observable<number>;
  /*Observable for secondes*/
  secDegrees$: Observable<number>;

  constructor(){
    
  }
  ngOnInit() {
    const date$ = interval(250)
      .pipe(
        takeUntil(this.destroy$),
        map(() => new Date()),
        shareReplay()
      );
    this.hourDegrees$ = date$.pipe(
      map(date => HrDegrees * date.getHours() + date.getMinutes()*0.5),
      distinctUntilChanged()
    );
    this.minDegrees$ = date$.pipe(
      map(date => MinDegrees * date.getMinutes() ),
      distinctUntilChanged()
    );
    this.secDegrees$ = date$.pipe(
      map(date => SecDegrees * date.getUTCSeconds() ),
      distinctUntilChanged()
    );
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
 
}
