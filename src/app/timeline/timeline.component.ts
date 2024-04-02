import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import anime from 'animejs';
import { NavControllerService } from '../shared/services/nav-controller.service';
import { Router } from '@angular/router';
import { GridsComponent } from '../shared/components/grids/grids.component';
import { Subscription } from 'rxjs';

// declare let anime : any;
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {
  isWalking: boolean;
  walkDirection: string;
  computedBgPosX;
  nextPage: string;
  isLoadScreen: boolean;
  animSubscription$: Subscription;
  @ViewChild('walkman') walkman: ElementRef;
  @ViewChild('bglayout') bglayout: ElementRef;
  @ViewChild(GridsComponent)
  private grids: GridsComponent;

  @HostListener('document:keydown', ['$event'])
  keypressEvent(event: KeyboardEvent) {
    var nextPos, currPos;
    nextPos = currPos = this.walkman.nativeElement.offsetLeft;
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.isWalking = true;
      this.isLoadScreen = false;
      this.walkDirection = 'right';
      nextPos = currPos + 10;
      this.moveMan(currPos, nextPos);
      this.moveBg('right');
    }
    else if (event.keyCode == KEY_CODE.LEFT_ARROW) {
      this.isWalking = true;
      this.isLoadScreen = false;
      this.walkDirection = 'left';
      nextPos = currPos - 10;
      this.moveMan(currPos, nextPos);
      this.moveBg('left');
    }

  }
  @HostListener('document:keyup', ['$event'])
  keyupEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW || event.keyCode == KEY_CODE.LEFT_ARROW)
      this.isWalking = false;
  }

  constructor(private navCtrl: NavControllerService, private router: Router) {
    this.isWalking = false;
    this.computedBgPosX = "0%";
    this.isLoadScreen = true;
    this.animSubscription$ = this.navCtrl.animInitiated$.subscribe(
      pageName => {
        this.nextPage = pageName;
        this.fadeElts();
      }
    );

  }

  moveMan(currPos, nextPos) {
    if (this.inViewport(nextPos)) {
      anime({
        targets: '.walk-container',
        keyframes: [
          {
            left: currPos
          },
          {
            left: nextPos
          }
        ],
        duration: 10,
        easing: 'steps(7)',
        loop: false
      }).play;
    }
  }

  inViewport(currPos) {
    var viewWidth = document.documentElement.clientWidth - 100;
    if (currPos < 100) return false;
    if (currPos > viewWidth) return false;
    return true;
  }

  moveBg(direction) {
    let currBgPos = parseInt(this.bglayout.nativeElement.style.backgroundPositionX);
    if (direction == 'left' && currBgPos >= 0)
      anime({
        targets: '.svg-wrapper',
        keyframes: [
          {
            backgroundPositionX: currBgPos
          },
          {
            backgroundPositionX: currBgPos - 1 + '%',
          }
        ],
        duration: 10,
        easing: 'linear',
        loop: false
      }).play;
    else if (direction == 'right' && currBgPos <= 100)
      anime({
        targets: '.svg-wrapper',
        keyframes: [
          {
            backgroundPositionX: currBgPos
          },
          {
            backgroundPositionX: currBgPos + 1 + '%',

          }
        ],
        duration: 10,
        easing: 'linear',
        loop: false
      }).play;
    else
      currBgPos = 0;
  }

  fadeElts() {
    var anim = anime({
      targets: '.svg-wrapper , .walk-container, .pathway',
      keyframes: [
        {
          opacity: 1
        },
        {
          opacity: 0,

        }
      ],
      duration: 10,
      easing: 'linear',
      loop: false
    });
    anim.finished.then(
      this.grids.selectedGrid(0)
    )
  }

  onNavEvent(event) {
    this.router.navigate(['/' + this.nextPage])
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.animSubscription$.unsubscribe();
  }
}

