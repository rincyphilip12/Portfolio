import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavControllerService {


  // Observable string sources
  // private initiateNav = new Subject<string>();
  private initiateAnim = new Subject<string>();

  // Observable string streams
  // navInitiated$ = this.initiateNav.asObservable();
  animInitiated$ = this.initiateAnim.asObservable();

  // Service message commands
  // initiateNavAction(pageName: string) {
  //   this.initiateNav.next(pageName);
  // }

  initiateAnimAction(pageName: string) {
    this.initiateAnim.next(pageName);
  }

  constructor() { }
}
