import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { GetResponsiveScreenDimensionsService } from '../../services/get-responsive-screen-dimensions.service';
import anime from 'animejs';
import { NavControllerService } from '../../services/nav-controller.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,

} from '@angular/animations';
// declare let anime : any;

const MathUtils = {
  lineEq: (y2, y1, x2, x1, currentVal) => {
    // y = mx + b 
    var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
    return m * currentVal + b;
  },
  lerp: (a, b, n) => (1 - n) * a + n * b
};
@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.scss'],
  // animations: [
  //   trigger('gridFall', [
  //     transition('* => *', [ // each time the binding value changes
  //       query(':leave', [
  //         stagger(100, [
  //           animate('0.5s', style({ opacity: 0 }))
  //         ])
  //       ])

  //     ])
  //   ])
  // ]
})


export class GridsComponent implements OnInit {
  // @ViewChild('gridWrap') gridWrap: any;
  // @ViewChild('grid') grid: any;
  // @HostListener('document:mousemove', ['$event'])
  // onMousemove($event) {
  //   this.posY = ($event.pageY);
  //   this.posX = ($event.pageX);
  // }
  @Input() page : string;
  gridWidth: number;
  gridHeight: number;
  gridItems;
  DOM;
  pos;
  // posY;
  // posX;
  animation;
  isAnimating;
  pageName;
  // itemsTotal;
  // height;
  // extraHeight;
  // columns;
  // gridDef;
  // gridTranslation;
  // lerpFactor;
  // resizeTimer;
@Output() navLinkClickAction = new EventEmitter<string>();
  constructor(private getScreenDim: GetResponsiveScreenDimensionsService, private navCtrl: NavControllerService) {
    this.isAnimating = true;
    this.gridItems = Array.from({ length: 64 }, () => Math.floor(Math.random() * 1));
    // this.getScreenDim.screenArea$.subscribe((o) => {
    //   console.log(o);
    //   this.gridHeight = (o.height) / 8;
    //   this.gridWidth = (o.width) / 8;
    // });

    // this.navCtrl.animInitiated$.subscribe(
    //   pageName => {
    //     this.pageName = pageName;
    //     // if (pageName == 'skills') {
    //       // this.selectedGrid(0);

    //     // }
    //   }
    // )
  }
  selectedGrid(index) {
    this.pos = index;
    this.animation = anime({
      targets: '.grid-item',
      opacity: [
        {
          value: 1, duration: 500
        },
        {
          value: 0,
          duration: 500,
          easing: 'easeInQuad'
        }
      ],
      translateY: [
        {
          value: 0, duration: 500
        },
        {
          value: () => anime.random(100, 400),
          duration: 500,
          easing: 'easeInQuad'
        }
      ],
      rotate: [
        {
          value: target => target.dataset.rotateDir === 'l' ? anime.random(2, 15) : anime.random(-0, -15),
          duration: 500,
          easing: 'easeInOutSine'
        },
        {
          value: target => target.dataset.rotateDir === 'l' ? 8 : -8,
          duration: 500,
          easing: 'easeInQuad'
        }
      ],
      delay: anime.stagger(350, { grid: [8, 8], from: this.pos })
    });
    this.animation.play();
    this.animation.finished.then(() => {
      // Pointer events class
      // this.DOM.el.classList.add('grid-wrap--hidden');
      this.isAnimating = false;
      this.navLinkClickAction.emit(this.pageName);

      // this.navCtrl.initiateNavAction(this.pageName);
    });
  }
  ngAfterViewInit() {
    this.DOM = { el: document.querySelector('.grid-wrap') };
    // The grid element
    // this.DOM.grid = this.DOM.el.querySelector('.grid');
    // Thr grid items
    this.DOM.items = [...this.DOM.el.children];
    this.DOM.items.forEach(item => {
      const rand = Math.random() < 0.5;
      item.style.transformOrigin = rand ? '0% 0%' : '100% 0%';
      item.dataset.rotateDir = rand ? 'l' : 'r';
    })




  }


  ngOnInit(): void {


  }

}







