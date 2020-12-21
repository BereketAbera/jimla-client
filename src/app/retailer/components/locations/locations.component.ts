import { LocationService } from '@app/_services/location/location.service';
import { AddLocationModalComponent } from './../add-location-modal/add-location-modal.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PwaPromptComponent } from '@app/landing/components/pwa-prompt/pwa-prompt.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations = [];
  locationClose: EventEmitter<any> = new EventEmitter();
  page=0;
  count=0;
  pageSize=5;
  firstReload: any;
  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private router:Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {   
      this.count= res.data.count;
      this.locations = res.data.rows;
    });
    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      if (!this.firstReload) {
        this.getLocations();
      } else {
        this.firstReload = false;
      }
    });
    this.locationClose.subscribe((res) => {
      this.getLocations()
    });
  }
  getLocations(){
    this.locationService.getConsumerLocation({ page: this.page, pageSize: this.pageSize }).subscribe((res: any) => {
      this.locations = res.rows;
      this.count=res.count;
    });
  }
  pageChanged(event) {    
    this.setUrlValues({ page: event - 1 });
  }

  pageSizeChanged(event) {
    setTimeout(() => {
      this.setUrlValues({ pageSize: event });
    }, 1);
  }

  setUrlValues(sObj) {
    let keys = Object.keys(sObj);
    let pObj = {};
    keys.map((key) => {
      pObj[key] = sObj[key];
    });
    const queryParams: Params = {
      ...pObj
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  addLocation() {
    this.modal.create({
      nzTitle: 'Add Location',
      nzContent: AddLocationModalComponent,
      nzAfterClose: this.locationClose,
    });
  }

  editLocation(location){    
    this.modal.create({
      nzTitle: 'Edit Location',
      nzContent: AddLocationModalComponent,
      nzAfterClose: this.locationClose,
      nzComponentParams:location
    });

    // this.modal.create({
    //   nzClosable: false,
    //   nzFooter: null,
    //   nzMaskClosable: false,
    //   nzStyle: { bottom: 0 },
    //   nzContent: PwaPromptComponent,
    //   nzComponentParams: { mobileType: 'android', promptEvent: {} }
    // });
  }
}
