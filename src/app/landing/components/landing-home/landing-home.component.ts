import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProducerService } from '@app/_services/identity/producer.service';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent implements OnInit {
  searchField: FormControl;

  constructor(private router: Router, private producerService: ProducerService) {}

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

    this.router.navigate(['/landing/home'], {
      queryParams: { q: this.searchField.value, type: 'product' }
    });
  }
}
