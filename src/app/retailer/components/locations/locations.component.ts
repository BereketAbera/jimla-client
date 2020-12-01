import { LocationService } from '@app/_services/location/location.service';
import { AddLocationModalComponent } from './../add-location-modal/add-location-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations = [];
  locationClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.locations = res.data;
    });

    this.locationClose.subscribe((res) => {
      this.locationService.getConsumerLocation().subscribe((res: any) => {
        this.locations = res;
      });
    });
  }

  addLocation() {
    this.modal.create({
      nzTitle: 'Add Location',
      nzContent: AddLocationModalComponent,
      nzAfterClose: this.locationClose
    });
  }
}
