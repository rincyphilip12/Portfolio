import {
  Injectable,
  OnDestroy,
} from '@angular/core';
import {
  Subject,
  BehaviorSubject,
  fromEvent,
} from 'rxjs';
import {
  takeUntil,
  debounceTime,
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetResponsiveScreenDimensionsService {

  constructor() { this.init(); }

  private _unsubscriber$: Subject<any> = new Subject();
  public screenArea$: BehaviorSubject<any> = new BehaviorSubject(null);
  // public screenHeight$: BehaviorSubject<number> = new BehaviorSubject(null);



  init() {
    this._setScreenArea(window.innerWidth, window.innerHeight);
    // this._setScreenHeight(window.innerWidth);

    fromEvent(document, 'resize')
      .pipe(
        debounceTime(100),
        takeUntil(this._unsubscriber$)
      ).subscribe((evt: any) => {
        console.log(evt.target.innerWidth, evt.target.innerHeight)
        this._setScreenArea(evt.target.innerWidth, evt.target.innerHeight);
      });
  }

  ngOnDestroy() {
    this._unsubscriber$.next();
    this._unsubscriber$.complete();
  }

  private _setScreenArea(width: number, height: number): void {
    this.screenArea$.next( { width : width, height : height});
  }
}
