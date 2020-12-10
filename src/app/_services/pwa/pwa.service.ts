import { Platform } from '@angular/cdk/platform';
import { EventEmitter, Injectable } from '@angular/core';
import { PwaPromptComponent } from '@app/landing/components/pwa-prompt/pwa-prompt.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;
  modalClose: EventEmitter<any> = new EventEmitter();
  modalActive = false;

  constructor(private modalService: NzModalService, private platform: Platform) {
    this.modalClose.subscribe((res) => {
      this.modalActive = false;
    });
  }

  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = 'standalone' in window.navigator && window.navigator['standalone'];
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        if (!this.modalActive) {
          this.modalService.create({
            nzClosable: false,
            nzFooter: null,
            nzMaskClosable: false,
            nzContent: PwaPromptComponent,
            nzComponentParams: { mobileType, promptEvent: this.promptEvent },
            nzAfterClose: this.modalClose
          });
        }

        this.modalActive = true;
      });
  }
}
