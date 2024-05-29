import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { GetResponsiveScreenDimensionsService } from '../../services/get-responsive-screen-dimensions.service';
import anime from 'animejs';
import { NavControllerService } from '../../services/nav-controller.service';
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
 
})


export class GridsComponent implements OnInit {
  
  @Input() page : string;
  gridWidth: number;
  gridHeight: number;
  gridItems;
  DOM;
  pos;
  animation;
  isAnimating;
  pageName;
  
@Output() navLinkClickAction = new EventEmitter<string>();
  constructor(private getScreenDim: GetResponsiveScreenDimensionsService, private navCtrl: NavControllerService) {
    this.isAnimating = true;
    this.gridItems = Array.from({ length: 64 }, () => Math.floor(Math.random() * 1));
  
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
      this.isAnimating = false;
      this.navLinkClickAction.emit(this.pageName);
    });
  }
  ngAfterViewInit() {
    this.DOM = { el: document.querySelector('.grid-wrap') };
    this.DOM.items = [...this.DOM.el.children];
    this.DOM.items.forEach(item => {
      const rand = Math.random() < 0.5;
      item.style.transformOrigin = rand ? '0% 0%' : '100% 0%';
      item.dataset.rotateDir = rand ? 'l' : 'r';
    })
  }

  ngOnInit(){}
}







