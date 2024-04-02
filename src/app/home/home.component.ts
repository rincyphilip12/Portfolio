import { Component, OnInit, ViewChild } from '@angular/core';
import anime from 'animejs';
import { NavControllerService } from '../shared/services/nav-controller.service';
import { Router } from '@angular/router';
import { GridsComponent } from '../shared/components/grids/grids.component';
import { Subscription } from 'rxjs';
// declare let anime : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})

export class HomeComponent implements OnInit {
  nextPage: string;
  animSubscription$: Subscription;
  @ViewChild(GridsComponent)
  private grids: GridsComponent;
  ngOnInit() { }
  constructor(private navCtrl: NavControllerService, private router: Router) {
    this.animSubscription$ = this.navCtrl.animInitiated$.subscribe(
      pageName => {
        this.nextPage = pageName;
        this.fadeText();
      }
    );
  }

  fadeText() {
    var anim = anime.timeline({ loop: false })
      .add({
        targets: ['.text-animation', '.profileImageSvg'],
        opacity: [1, 0],
        duration: 1000,
        easing: "easeOutExpo",
        delay: (elem, index) => index * 100
      })
    anim.finished.then(
      this.grids.selectedGrid(0)
    )
  }

  onNavEvent(event) {
    this.router.navigate(['/' + this.nextPage])
  }

  ngAfterViewInit(): void {
    var pathEls = document.querySelectorAll('.profileImageSvg path');
    var pathEl = pathEls[0];
    var offset = anime.setDashoffset(pathEl);
    pathEl.setAttribute('stroke-dashoffset', offset);
    anime.timeline({
      targets: pathEl,
      strokeDashoffset: [offset, 0],
      duration: anime.random(1000, 3000),
      delay: anime.random(0, 2000),
      easing: 'easeInOutSine',
    }).add({
      targets: ['.profileImageSvg .ribbon', '.profileImageSvg .butterflies'],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInExpo",
    })

    

    // Wrap every letter in a span
    const textWrapper = document.querySelectorAll('.text-animation');
    textWrapper.forEach(elt => {
      elt.innerHTML = elt.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    });

    anime.timeline({ loop: false })
      .add({
        targets: '.text-command  .letter',
        scale: [1, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutExpo",
        delay: (elem, index) => index * 100
      })
      .add({
        targets: '.name  .letter',
        scale: [1, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutExpo",
        delay: (elem, index) => index * 100
      })
      .add({
        targets: '.tagline  .letter',
        scale: [1, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutExpo",
        delay: (elem, index) => index * 100
      })
  }

  ngOnDestroy() {
    this.animSubscription$.unsubscribe();
  }
}
