import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {}

  ngOnInit() {
    this.swUpdate.available.subscribe(() => {
      console.log('----------------------new version available-------------------------------');
      if (confirm('New Version Available. Load new Version?')) {
        window.location.reload();
      }
    });
  }

  title = 'jimla-client';
}
