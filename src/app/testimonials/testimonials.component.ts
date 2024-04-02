import { Component, OnInit, ViewChild } from '@angular/core';
import { NavControllerService } from '../shared/services/nav-controller.service';
import { Router } from '@angular/router';
import anime from 'animejs';
import { GridsComponent } from '../shared/components/grids/grids.component';
import { Subscription } from 'rxjs';
// declare let anime : any;

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  nextPage: string;
  @ViewChild(GridsComponent)
  private grids: GridsComponent;
  animSubscription$: Subscription;
  constructor(private navCtrl: NavControllerService, private router: Router) {
    this.animSubscription$ = this.navCtrl.animInitiated$.subscribe(
      pageName => {
        this.nextPage = pageName;
        this.fadeElts();
      }
    );
  }

  fadeElts() {
    var animation = anime.timeline({ loop: false })
      .add({
        targets: ['.book'],
        opacity: [1, 0],
        duration: 1000,
        easing: "easeOutExpo",
        delay: (elem, index) => index * 100
      })
    animation.finished.then(
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
