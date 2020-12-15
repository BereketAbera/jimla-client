import { NzModalRef } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pwa-prompt',
  templateUrl: './pwa-prompt.component.html',
  styleUrls: ['./pwa-prompt.component.scss']
})
export class PwaPromptComponent implements OnInit {
  @Input('mobileType') mobileType: any;
  @Input('promptEvent') promptEvent: any;
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {}

  public installPwa(): void {
    this.promptEvent.prompt();
    this.destroyModal();
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }
}
