import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Jimla';
  online;

  constructor(
    private swUpdate: SwUpdate,
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.swUpdate.available.subscribe(() => {
      if (confirm('New Version Available. Load new Version?')) {
        console.log('hello');
        this.router.navigateByUrl('https://jimla.netlify.app');
        // window.location.href = 'https://jimla.netlify.app';
      }
    });

    this.connectionService.monitor().subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });
  }
}
