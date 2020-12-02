import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
  ActivatedRoute,
} from "@angular/router";

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  routing;
  constructor(private router:Router,private route:ActivatedRoute) {

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.routing = true;
          window.scrollTo(0, 0);
          break;
        }
        case event instanceof NavigationEnd: {
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.routing = false;
          break;
        }
        default: {
          break;
        }
      }
    });
   }

  ngOnInit(): void {
  }

}
