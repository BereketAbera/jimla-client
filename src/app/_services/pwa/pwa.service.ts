import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { PwaPromptComponent } from '@app/landing/components/pwa-prompt/pwa-prompt.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(private modalService: NzModalService, private platform: Platform) {}

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
      .subscribe(() =>
        this.modalService.create({
          nzContent: PwaPromptComponent,
          nzComponentParams: { mobileType, promptEvent: this.promptEvent }
        })
      );
  }
}
