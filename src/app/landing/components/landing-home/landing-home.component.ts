import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProducerService } from '@app/_services/identity/producer.service';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent implements OnInit {
  searchField: FormControl;

  constructor(private producerService: ProducerService) {}

  ngOnInit(): void {
    this.searchField = new FormControl();

    this.searchField.valueChanges.subscribe((term) => {
      // this.searches.push(term);
    });
  }

  onSumbit() {
    if (!this.searchField.value) {
      return;
    }

    /**
     * Search for Product
     */
    this.producerService.searchProducer(this.searchField.value).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
