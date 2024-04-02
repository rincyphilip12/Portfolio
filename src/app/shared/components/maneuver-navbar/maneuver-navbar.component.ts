
import { Component, OnInit, HostListener } from '@angular/core';
import anime from 'animejs';
import { filter } from 'rxjs/operators';
import { NavControllerService } from '../../services/nav-controller.service';
import { Router, NavigationEnd } from '@angular/router';
// declare var anime : any;

@Component({
  selector: 'app-maneuver-navbar',
  templateUrl: './maneuver-navbar.component.html',
  styleUrls: ['./maneuver-navbar.component.scss']
})
export class ManeuverNavbarComponent implements OnInit {
  expand: boolean = false;
  top;
  left;
  menuTop;
  menuLeft;
  isClicked: boolean = true;
  mouseOutOfBounds: boolean = false;
  pageName: string;
  currentRoute: string;
  // @HostBinding("class.menu-list-expanded") isMenuListExpanded : boolean;
  @HostListener('document:click', ['$event'])
  onClick($event) {
    this.initiateNav();
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove($event) {
    this.top = ($event.pageY);
    this.left = ($event.pageX);
    this.menuTop = (this.isClicked) ? this.menuTop : this.top;
    this.menuLeft = (this.isClicked) ? this.menuLeft : this.left;

  }

  initiateNav() {

    if (!this.isClicked) {
      this.isClicked = true;
      this.menuTop = this.top;
      this.menuLeft = this.left;
      anime({
        targets: '.menu',
        width: "17em",
        background: "rgb(10, 25, 47)",
        borderRadius: "0%",
        borderTop: "1px solid #D8D8D8",
        easing: 'easeInOutQuad',
        duration: 400,
        // translateX : -150
      });
      anime({
        targets: '.menuTitle',
        translateX: 0,
        translateY: -70,
        color: '#fff'
      })

    }
    else {
      this.isClicked = false;
      anime({
        targets: '.menu',
        width: "5em",
        background: "#fff",
        borderRadius: "100%",
        borderTop: "1px solid #D8D8D8",
        easing: 'easeInOutQuad',
        duration: 400
      })
      anime({
        targets: '.menuTitle',
        translateX: 0,
        translateY: 0,
        color: 'rgb(10, 25, 47)'
      })
    }

  }

  goToPage(pageName) {
    this.navCtrl.initiateAnimAction(pageName);
  }

  constructor(private navCtrl: NavControllerService, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        var trimmedPath = event['url'];
        trimmedPath = trimmedPath.match(/home|testimonials|timeline/g);
        this.currentRoute = (trimmedPath) ? trimmedPath[0] : 'home';

      });
  }


  ngOnInit(): void {
    this.initiateNav();
  }


}
